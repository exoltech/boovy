const express = require('express');
const router = express.Router();
const ClaudeService = require('../utils/claude');
const { validatePrompt, handleValidationErrors, sanitizePrompt } = require('../utils/validation');

const claude = new ClaudeService();

// POST /api/generate - Generate app configuration from prompt
router.post('/', validatePrompt, handleValidationErrors, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Sanitize the prompt
    const sanitizedPrompt = sanitizePrompt(prompt);
    
    if (!sanitizedPrompt || sanitizedPrompt.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Invalid prompt',
        message: 'Prompt is too short or contains only invalid characters'
      });
    }

    console.log(`🤖 Generating config for prompt: "${sanitizedPrompt.substring(0, 100)}..."`);

    // Call Claude API to generate configuration
    const result = await claude.generateAppConfig(sanitizedPrompt);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to generate configuration',
        details: result.error
      });
    }

    // Add metadata to the response
    const response = {
      success: true,
      data: {
        ...result.data,
        metadata: {
          originalPrompt: sanitizedPrompt,
          generatedAt: new Date().toISOString(),
          model: 'claude-3-haiku-20240307'
        }
      }
    };

    console.log(`✅ Generated config for template: ${result.data.template}`);
    res.json(response);

  } catch (error) {
    console.error('Generate endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process the request'
    });
  }
});

// GET /api/generate/test - Test Claude API connection
router.get('/test', async (req, res) => {
  try {
    const result = await claude.validateApiKey();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to test Claude API',
      details: error.message
    });
  }
});

module.exports = router;

