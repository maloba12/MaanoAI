const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

class AIService {
  constructor() {
    // Initialize AI providers
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    
    this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Model configurations
    this.models = {
      'gpt-4': {
        provider: 'openai',
        model: 'gpt-4',
        maxTokens: 4000,
        temperature: 0.7,
        strengths: ['Creative Writing', 'Coding', 'Complex Reasoning'],
        weaknesses: ['Real-time Information', 'Cost']
      },
      'gpt-3.5-turbo': {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        maxTokens: 4000,
        temperature: 0.7,
        strengths: ['Fast Response', 'Cost Effective', 'General Purpose'],
        weaknesses: ['Less Creative', 'Limited Context']
      },
      'claude-3-sonnet': {
        provider: 'anthropic',
        model: 'claude-3-sonnet-20240229',
        maxTokens: 4000,
        temperature: 0.7,
        strengths: ['Analysis', 'Summarization', 'Safety', 'Long Context'],
        weaknesses: ['Creative Writing', 'Real-time Info']
      },
      'claude-3-haiku': {
        provider: 'anthropic',
        model: 'claude-3-haiku-20240307',
        maxTokens: 4000,
        temperature: 0.7,
        strengths: ['Fast Response', 'Cost Effective', 'Analysis'],
        weaknesses: ['Limited Creativity', 'Shorter Context']
      },
      'gemini-pro': {
        provider: 'gemini',
        model: 'gemini-pro',
        maxTokens: 4000,
        temperature: 0.7,
        strengths: ['Research', 'Web Content', 'Multilingual', 'Free Tier'],
        weaknesses: ['Creative Writing', 'Complex Reasoning']
      },
      'qwen-max': {
        provider: 'qwen',
        model: 'qwen-max',
        maxTokens: 4000,
        temperature: 0.7,
        strengths: ['Coding', 'Mathematics', 'Chinese Language', 'Cost Effective'],
        weaknesses: ['English Writing', 'Limited Context']
      }
    };
  }

  async generateResponse(modelId, prompt, options = {}) {
    const modelConfig = this.models[modelId];
    if (!modelConfig) {
      throw new Error(`Unsupported model: ${modelId}`);
    }

    const startTime = Date.now();
    
    try {
      let response;
      
      switch (modelConfig.provider) {
        case 'openai':
          response = await this.callOpenAI(modelConfig, prompt, options);
          break;
        case 'anthropic':
          response = await this.callAnthropic(modelConfig, prompt, options);
          break;
        case 'gemini':
          response = await this.callGemini(modelConfig, prompt, options);
          break;
        case 'qwen':
          response = await this.callQwen(modelConfig, prompt, options);
          break;
        default:
          throw new Error(`Unknown provider: ${modelConfig.provider}`);
      }

      const endTime = Date.now();
      
      return {
        success: true,
        content: response.content,
        model: modelId,
        provider: modelConfig.provider,
        metadata: {
          responseTime: endTime - startTime,
          model: modelConfig.model,
          strengths: modelConfig.strengths,
          weaknesses: modelConfig.weaknesses,
          ...response.metadata
        }
      };
      
    } catch (error) {
      console.error(`Error calling ${modelConfig.provider}:`, error);
      return {
        success: false,
        error: error.message,
        model: modelId,
        provider: modelConfig.provider
      };
    }
  }

  async callOpenAI(modelConfig, prompt, options) {
    const completion = await this.openai.chat.completions.create({
      model: modelConfig.model,
      messages: [
        {
          role: 'system',
          content: 'You are Maano AI, an educational AI assistant. Provide helpful, accurate, and safe responses to students and teachers. Always prioritize educational value and safety.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: options.maxTokens || modelConfig.maxTokens,
      temperature: options.temperature || modelConfig.temperature,
    });

    return {
      content: completion.choices[0].message.content,
      metadata: {
        usage: completion.usage,
        finishReason: completion.choices[0].finish_reason
      }
    };
  }

  async callAnthropic(modelConfig, prompt, options) {
    const message = await this.anthropic.messages.create({
      model: modelConfig.model,
      max_tokens: options.maxTokens || modelConfig.maxTokens,
      temperature: options.temperature || modelConfig.temperature,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      system: 'You are Maano AI, an educational AI assistant. Provide helpful, accurate, and safe responses to students and teachers. Always prioritize educational value and safety.'
    });

    return {
      content: message.content[0].text,
      metadata: {
        usage: message.usage,
        stopReason: message.stop_reason
      }
    };
  }

  async callGemini(modelConfig, prompt, options) {
    const model = this.gemini.getGenerativeModel({ model: modelConfig.model });
    
    const result = await model.generateContent([
      'You are Maano AI, an educational AI assistant. Provide helpful, accurate, and safe responses to students and teachers. Always prioritize educational value and safety.',
      prompt
    ]);
    
    const response = await result.response;
    
    return {
      content: response.text(),
      metadata: {
        finishReason: response.candidates[0].finishReason,
        safetyRatings: response.candidates[0].safetyRatings
      }
    };
  }

  async callQwen(modelConfig, prompt, options) {
    // Qwen API call implementation
    // This would need to be implemented based on Qwen's API documentation
    const response = await axios.post('https://api.qwen.ai/v1/chat/completions', {
      model: modelConfig.model,
      messages: [
        {
          role: 'system',
          content: 'You are Maano AI, an educational AI assistant. Provide helpful, accurate, and safe responses to students and teachers. Always prioritize educational value and safety.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: options.maxTokens || modelConfig.maxTokens,
      temperature: options.temperature || modelConfig.temperature,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.QWEN_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      content: response.data.choices[0].message.content,
      metadata: {
        usage: response.data.usage,
        finishReason: response.data.choices[0].finish_reason
      }
    };
  }

  async compareModels(prompt, modelIds, options = {}) {
    const promises = modelIds.map(modelId => 
      this.generateResponse(modelId, prompt, options)
    );

    const results = await Promise.allSettled(promises);
    
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          success: false,
          error: result.reason.message,
          model: modelIds[index],
          provider: this.models[modelIds[index]]?.provider || 'unknown'
        };
      }
    });
  }

  getAvailableModels() {
    return Object.keys(this.models).map(modelId => ({
      id: modelId,
      ...this.models[modelId]
    }));
  }

  getModelRecommendation(prompt, subject = null) {
    // Simple recommendation logic - can be enhanced with ML
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('code') || promptLower.includes('programming')) {
      return ['gpt-4', 'qwen-max', 'claude-3-sonnet'];
    }
    
    if (promptLower.includes('math') || promptLower.includes('calculate')) {
      return ['qwen-max', 'gpt-4', 'claude-3-sonnet'];
    }
    
    if (promptLower.includes('creative') || promptLower.includes('write')) {
      return ['gpt-4', 'claude-3-sonnet', 'gemini-pro'];
    }
    
    if (promptLower.includes('analyze') || promptLower.includes('summarize')) {
      return ['claude-3-sonnet', 'gpt-4', 'gemini-pro'];
    }
    
    if (promptLower.includes('research') || promptLower.includes('web')) {
      return ['gemini-pro', 'claude-3-sonnet', 'gpt-4'];
    }
    
    // Default recommendation
    return ['gpt-4', 'claude-3-sonnet', 'gemini-pro'];
  }
}

module.exports = new AIService(); 