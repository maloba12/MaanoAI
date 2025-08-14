const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const { body, validationResult } = require('express-validator');

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  // TODO: Implement JWT token verification
  // For now, we'll assume the user is authenticated
  next();
};

// Get available AI models
router.get('/models', requireAuth, async (req, res) => {
  try {
    const models = aiService.getAvailableModels();
    res.json({
      success: true,
      data: models
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch available models'
    });
  }
});

// Single chat with specific model
router.post('/chat', requireAuth, [
  body('message').trim().isLength({ min: 1, max: 4000 }).withMessage('Message must be between 1 and 4000 characters'),
  body('modelId').isString().withMessage('Model ID is required'),
  body('contextId').optional().isString().withMessage('Context ID must be a string')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { message, modelId, contextId, options = {} } = req.body;

    // Generate AI response
    const response = await aiService.generateResponse(modelId, message, options);

    if (response.success) {
      // TODO: Save conversation to database
      res.json({
        success: true,
        data: {
          message: response.content,
          model: response.model,
          provider: response.provider,
          metadata: response.metadata,
          contextId: contextId || null
        }
      });
    } else {
      res.status(500).json({
        success: false,
        error: response.error,
        model: response.model
      });
    }

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Compare multiple AI models side by side
router.post('/compare', requireAuth, [
  body('message').trim().isLength({ min: 1, max: 4000 }).withMessage('Message must be between 1 and 4000 characters'),
  body('models').isArray({ min: 1, max: 4 }).withMessage('Must select 1-4 models to compare'),
  body('models.*').isString().withMessage('Each model must be a string')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { message, models, options = {} } = req.body;

    // Validate that all requested models are available
    const availableModels = aiService.getAvailableModels();
    const availableModelIds = availableModels.map(m => m.id);
    
    const invalidModels = models.filter(modelId => !availableModelIds.includes(modelId));
    if (invalidModels.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid models: ${invalidModels.join(', ')}`
      });
    }

    // Generate responses from all models
    const responses = await aiService.compareModels(message, models, options);

    // TODO: Save comparison to database
    res.json({
      success: true,
      data: {
        message,
        responses,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Compare error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get AI model recommendations based on prompt
router.post('/recommend', requireAuth, [
  body('prompt').trim().isLength({ min: 1, max: 1000 }).withMessage('Prompt must be between 1 and 1000 characters'),
  body('subject').optional().isString().withMessage('Subject must be a string')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { prompt, subject } = req.body;

    // Get model recommendations
    const recommendedModels = aiService.getModelRecommendation(prompt, subject);
    
    // Get full model details
    const availableModels = aiService.getAvailableModels();
    const recommendedModelDetails = recommendedModels
      .map(modelId => availableModels.find(m => m.id === modelId))
      .filter(Boolean);

    res.json({
      success: true,
      data: {
        prompt,
        subject,
        recommendedModels: recommendedModelDetails,
        reasoning: `Based on your prompt about "${prompt}", these models are recommended for their strengths in the relevant areas.`
      }
    });

  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get chat history (placeholder for future implementation)
router.get('/history', requireAuth, async (req, res) => {
  try {
    // TODO: Implement chat history retrieval from database
    res.json({
      success: true,
      data: {
        conversations: [],
        message: 'Chat history feature coming soon'
      }
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Export conversation (placeholder for future implementation)
router.post('/export', requireAuth, [
  body('conversationId').isString().withMessage('Conversation ID is required'),
  body('format').isIn(['pdf', 'docx', 'txt']).withMessage('Format must be pdf, docx, or txt')
], async (req, res) => {
  try {
    // TODO: Implement conversation export
    res.json({
      success: true,
      data: {
        message: 'Export feature coming soon',
        conversationId: req.body.conversationId,
        format: req.body.format
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router; 