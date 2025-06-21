const { body, validationResult } = require('express-validator');

// Input sanitization and validation rules
const validatePrompt = [
  body('prompt')
    .isString()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Prompt must be between 10 and 2000 characters')
    .matches(/^[a-zA-Z0-9\s\.,!?;:()\-_'"\/\[\]{}@#$%&*+=<>|~`]+$/)
    .withMessage('Prompt contains invalid characters'),
];

const validateScaffoldConfig = [
  body('config')
    .isObject()
    .withMessage('Config must be an object'),
  body('config.framework')
    .isIn(['next-js', 'react', 'vue', 'vanilla'])
    .withMessage('Invalid framework'),
  body('config.backend')
    .isIn(['node-express', 'python-flask', 'none'])
    .withMessage('Invalid backend'),
  body('config.template')
    .isIn(['saas-stripe-auth', 'portfolio-blog', 'firebase-journal', 'basic-landing'])
    .withMessage('Invalid template'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Sanitize prompt to prevent injection attacks
const sanitizePrompt = (prompt) => {
  // Remove potentially dangerous patterns
  const dangerous = [
    /javascript:/gi,
    /data:/gi,
    /<script/gi,
    /<\/script>/gi,
    /on\w+\s*=/gi,
    /eval\s*\(/gi,
    /function\s*\(/gi,
  ];

  let sanitized = prompt;
  dangerous.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  return sanitized.trim();
};

module.exports = {
  validatePrompt,
  validateScaffoldConfig,
  handleValidationErrors,
  sanitizePrompt
};

