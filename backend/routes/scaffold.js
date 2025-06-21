const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const archiver = require('archiver');
const { validateScaffoldConfig, handleValidationErrors } = require('../utils/validation');

// POST /api/scaffold - Generate code from configuration
router.post('/', validateScaffoldConfig, handleValidationErrors, async (req, res) => {
  try {
    const { config } = req.body;
    
    console.log(`🏗️ Scaffolding app with template: ${config.template}`);

    // Load the appropriate template
    const templatePath = path.join(__dirname, '../../templates', config.template);
    
    try {
      await fs.access(templatePath);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Template not found',
        message: `Template "${config.template}" does not exist`
      });
    }

    // Generate the code structure
    const codeStructure = await generateCodeFromTemplate(templatePath, config);

    // Create a unique ID for this generation
    const generationId = `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store the generated files temporarily (in a real app, use a proper storage solution)
    const tempDir = path.join(__dirname, '../temp', generationId);
    await fs.mkdir(tempDir, { recursive: true });

    // Write all generated files to temp directory
    for (const [filePath, content] of Object.entries(codeStructure.files)) {
      const fullPath = path.join(tempDir, filePath);
      const dir = path.dirname(fullPath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(fullPath, content, 'utf8');
    }

    console.log(`✅ Generated ${Object.keys(codeStructure.files).length} files for ${config.template}`);

    res.json({
      success: true,
      data: {
        generationId,
        files: codeStructure.files,
        downloadUrl: `/api/download/${generationId}`,
        metadata: {
          template: config.template,
          framework: config.framework,
          backend: config.backend,
          fileCount: Object.keys(codeStructure.files).length,
          generatedAt: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('Scaffold endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to scaffold application',
      message: error.message
    });
  }
});

// Function to generate code from template
async function generateCodeFromTemplate(templatePath, config) {
  const files = {};
  
  try {
    // Read template files recursively
    const templateFiles = await readTemplateFiles(templatePath);
    
    // Process each template file
    for (const [relativePath, content] of Object.entries(templateFiles)) {
      // Replace template variables with actual values
      const processedContent = processTemplateContent(content, config);
      files[relativePath] = processedContent;
    }

    // Add additional files based on configuration
    if (config.integrations?.stripe) {
      files['lib/stripe.js'] = generateStripeIntegration(config);
    }

    if (config.integrations?.supabase) {
      files['lib/supabase.js'] = generateSupabaseIntegration(config);
    }

    // Generate package.json based on features
    files['package.json'] = generatePackageJson(config);

    // Generate README
    files['README.md'] = generateReadme(config);

    return { files };

  } catch (error) {
    throw new Error(`Failed to process template: ${error.message}`);
  }
}

// Read all files from template directory recursively
async function readTemplateFiles(dir, basePath = '') {
  const files = {};
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await readTemplateFiles(fullPath, relativePath);
      Object.assign(files, subFiles);
    } else {
      const content = await fs.readFile(fullPath, 'utf8');
      files[relativePath] = content;
    }
  }

  return files;
}

// Process template content by replacing variables
function processTemplateContent(content, config) {
  let processed = content;

  // Replace common template variables
  const variables = {
    '{{APP_NAME}}': 'Generated App',
    '{{FRAMEWORK}}': config.framework,
    '{{BACKEND}}': config.backend,
    '{{DATABASE}}': config.database || 'none',
    '{{DESCRIPTION}}': config.description || 'Generated application',
    '{{HAS_STRIPE}}': config.integrations?.stripe ? 'true' : 'false',
    '{{HAS_SUPABASE}}': config.integrations?.supabase ? 'true' : 'false',
    '{{HAS_AUTH}}': config.features?.includes('auth') ? 'true' : 'false',
    '{{STYLING}}': config.styling || 'tailwind'
  };

  for (const [variable, value] of Object.entries(variables)) {
    processed = processed.replace(new RegExp(variable, 'g'), value);
  }

  return processed;
}

// Generate Stripe integration code
function generateStripeIntegration(config) {
  return `import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(amount, currency = 'usd') {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
    });
    
    return paymentIntent;
  } catch (error) {
    throw new Error('Failed to create payment intent');
  }
}

export default stripe;
`;
}

// Generate Supabase integration code
function generateSupabaseIntegration(config) {
  return `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
`;
}

// Generate package.json based on configuration
function generatePackageJson(config) {
  const basePackages = {
    "name": "generated-app",
    "version": "1.0.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "next": "^14.0.0"
    },
    "devDependencies": {
      "@types/node": "^20.0.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "typescript": "^5.0.0",
      "eslint": "^8.0.0",
      "eslint-config-next": "^14.0.0"
    }
  };

  // Add dependencies based on configuration
  if (config.styling === 'tailwind') {
    basePackages.devDependencies.tailwindcss = "^3.3.0";
    basePackages.devDependencies.postcss = "^8.4.0";
    basePackages.devDependencies.autoprefixer = "^10.4.0";
  }

  if (config.integrations?.stripe) {
    basePackages.dependencies.stripe = "^14.0.0";
    basePackages.dependencies["@stripe/stripe-js"] = "^2.0.0";
  }

  if (config.integrations?.supabase) {
    basePackages.dependencies["@supabase/supabase-js"] = "^2.38.0";
  }

  return JSON.stringify(basePackages, null, 2);
}

// Generate README
function generateReadme(config) {
  return `# Generated App

${config.description || 'A web application generated by Boovy.'}

## Features

${config.features?.map(feature => `- ${feature.charAt(0).toUpperCase() + feature.slice(1)}`).join('\n') || '- Basic functionality'}

## Tech Stack

- **Frontend**: ${config.framework}
- **Backend**: ${config.backend}
- **Database**: ${config.database || 'None'}
- **Styling**: ${config.styling || 'CSS'}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Generated by Boovy

This application was generated using Boovy, a vibe-based coding platform.
`;
}

module.exports = router;

