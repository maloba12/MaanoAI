import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  Brain, 
  Zap, 
  Shield,
  Search,
  Send,
  Bot,
  Star,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const aiModels = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      description: 'Best for creative writing, coding, and complex reasoning',
      strengths: ['Creative Writing', 'Coding', 'Complex Reasoning'],
      icon: '🤖',
      color: 'bg-blue-500'
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      provider: 'Anthropic',
      description: 'Excellent for analysis, summarization, and safety',
      strengths: ['Analysis', 'Summarization', 'Safety'],
      icon: '🧠',
      color: 'bg-orange-500'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      provider: 'Google',
      description: 'Great for research, web content, and multilingual tasks',
      strengths: ['Research', 'Web Content', 'Multilingual'],
      icon: '💎',
      color: 'bg-purple-500'
    },
    {
      id: 'qwen',
      name: 'Qwen',
      provider: 'Alibaba',
      description: 'Strong in coding, math, and Chinese language support',
      strengths: ['Coding', 'Mathematics', 'Chinese'],
      icon: '🌟',
      color: 'bg-green-500'
    }
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      model: selectedModel
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: `This is a simulated response from ${selectedModel}. In the real implementation, this would be the actual AI response.`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        model: selectedModel
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-maano-soft-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-maano-deep-blue to-maano-primary flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="ml-3 text-xl font-bold text-gradient">Maano AI</h1>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - AI Models */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-maano-deep-blue mb-4 flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                AI Models
              </h2>
              
              <div className="space-y-3">
                {aiModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-3 rounded-xl border transition-all duration-200 text-left ${
                      selectedModel === model.id
                        ? 'border-maano-primary bg-maano-primary bg-opacity-10'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg ${model.color} flex items-center justify-center text-white text-sm font-medium mr-3`}>
                        {model.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{model.name}</div>
                        <div className="text-xs text-gray-500">{model.provider}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">{model.description}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {model.strengths.map((strength, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card mt-6">
              <h3 className="text-md font-semibold text-maano-deep-blue mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full btn-secondary text-left">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Subject Tutors
                </button>
                <button className="w-full btn-secondary text-left">
                  <Zap className="w-4 h-4 inline mr-2" />
                  AI Explorer
                </button>
                <button className="w-full btn-secondary text-left">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Safety Settings
                </button>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="card h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-maano-deep-blue">Chat with {aiModels.find(m => m.id === selectedModel)?.name}</h2>
                    <p className="text-sm text-gray-500">Ask questions, get explanations, and learn with AI assistance</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
                    <p className="text-gray-500">Ask me anything! I'm here to help with your learning journey.</p>
                  </div>
                ) : (
                  chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-maano-primary text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-sm">{msg.content}</div>
                        <div className={`text-xs mt-2 ${
                          msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {msg.timestamp} • {msg.model}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-maano-primary"></div>
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="input-field pl-10 resize-none"
                      rows="3"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isLoading}
                    className="btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Learning Progress</p>
                <p className="text-2xl font-semibold text-gray-900">87%</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI Models Used</p>
                <p className="text-2xl font-semibold text-gray-900">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 