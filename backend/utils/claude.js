const Anthropic = require('@anthropic-ai/sdk');

class ClaudeService {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
  }

  async generateAppConfig(prompt) {
    try {
      const systemPrompt = `You are an expert full-stack developer and architect. Your task is to analyze a natural language prompt for a web application and return ONLY a structured JSON response with the application configuration.

IMPORTANT: Return ONLY valid JSON, no explanations, no markdown, no additional text.

The JSON should have this exact structure:
{
  "framework": "next-js" | "react" | "vue" | "vanilla",
  "backend": "node-express" | "python-flask" | "none",
  "database": "supabase" | "firebase" | "mongodb" | "postgresql" | "none",
  "features": ["auth", "payments", "blog", "dashboard", "api", "realtime", "file-upload"],
  "template": "saas-stripe-auth" | "portfolio-blog" | "firebase-journal" | "basic-landing",
  "integrations": {
    "stripe": boolean,
    "supabase": boolean,
    "firebase": boolean,
    "auth": "supabase" | "firebase" | "custom" | "none"
  },
  "styling": "tailwind" | "styled-components" | "css-modules",
  "description": "Brief description of the app",
  "complexity": "simple" | "medium" | "complex"
}

Choose the most appropriate template based on the prompt:
- "saas-stripe-auth": For SaaS apps, subscription services, payment-based apps
- "portfolio-blog": For personal websites, blogs, portfolios, content sites
- "firebase-journal": For personal apps, journals, note-taking, simple CRUD
- "basic-landing": For simple landing pages, marketing sites, basic websites

Analyze the prompt and determine the best configuration.`;

      const response = await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.3,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const content = response.content[0].text.trim();
      
      // Try to parse the JSON response
      try {
        const config = JSON.parse(content);
        return {
          success: true,
          data: config
        };
      } catch (parseError) {
        console.error('Failed to parse Claude response as JSON:', content);
        return {
          success: false,
          error: 'Invalid JSON response from Claude',
          rawResponse: content
        };
      }

    } catch (error) {
      console.error('Claude API error:', error);
      return {
        success: false,
        error: 'Failed to generate app configuration',
        details: error.message
      };
    }
  }

  async validateApiKey() {
    try {
      const response = await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [
          {
            role: 'user',
            content: 'Hello'
          }
        ]
      });
      return { success: true, message: 'API key is valid' };
    } catch (error) {
      return { 
        success: false, 
        error: 'Invalid API key or Claude API error',
        details: error.message 
      };
    }
  }
}

module.exports = ClaudeService;

