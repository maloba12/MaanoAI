# Maano AI - Multi-AI Learning Platform

> **Where Wisdom Meets Technology**

Maano AI is a comprehensive learning platform that brings multiple AI models (ChatGPT, Claude, Gemini, Qwen, etc.) into a single, safe, and student-friendly interface. It helps learners pick the right AI for each task, compare answers side by side, and build AI literacy while supporting teachers with classroom tools, analytics, and content safeguards.

## 🚀 Features

### Core Features (v1)
- **Multi-AI Access**: Chat interface for each AI model with quick switching
- **AI Explorer**: Ask multiple AIs simultaneously and compare side-by-side
- **Smart Recommendations**: AI-powered suggestions for which model to use
- **Subject Tutors**: Specialized modes for Math, Science, Coding, Languages
- **Safety & Moderation**: Content filtering, rate limits, and role-based controls
- **Multi-language Support**: English and Zambian languages (Bemba, Nyanja, Tonga, Lozi)

### Target Users
- **Students** (Secondary/University): Explanations, practice, references, project help
- **Teachers/Lecturers**: Prompt curation, usage monitoring, task assignment, analytics
- **School Administrators**: Organization management, billing, policies, SSO integration
- **Parents/Guardians**: Progress summaries and usage alerts

## 🏗️ Architecture

```
Frontend (React + Vite + TailwindCSS)
    ↓
Backend API (Node.js + Express)
    ↓
AI Providers (OpenAI, Anthropic, Google, Alibaba)
    ↓
Databases (PostgreSQL, MongoDB, Redis)
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **TailwindCSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **JWT** authentication
- **Rate limiting** and security middleware
- **Multiple AI provider integrations**
- **PostgreSQL** for user data
- **MongoDB** for conversations
- **Redis** for caching

### AI Providers
- OpenAI (GPT-4, GPT-3.5-turbo)
- Anthropic (Claude 3 Sonnet, Claude 3 Haiku)
- Google (Gemini Pro)
- Alibaba (Qwen Max)

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- MongoDB 6+
- Redis 6+
- API keys for AI providers

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MaanoAI
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Database Setup
```bash
# PostgreSQL
createdb maano_ai

# MongoDB
# Ensure MongoDB is running locally or update connection string

# Redis
# Ensure Redis is running locally or update connection string
```

## 🔧 Environment Configuration

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database URLs
DATABASE_URL=postgres://username:password@localhost:5432/maano_ai
MONGODB_URI=mongodb://localhost:27017/maano_ai
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# AI Provider API Keys
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
GEMINI_API_KEY=your-google-gemini-api-key-here
QWEN_API_KEY=your-qwen-api-key-here

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token

### Chat & AI
- `GET /api/chat/models` - Get available AI models
- `POST /api/chat/chat` - Single chat with specific model
- `POST /api/chat/compare` - Compare multiple AI models
- `POST /api/chat/recommend` - Get AI model recommendations
- `GET /api/chat/history` - Get chat history

### Health Check
- `GET /health` - Service health status

## 🎯 Development Roadmap

### Month 0-1: Foundation ✅
- [x] Project structure and setup
- [x] Authentication system
- [x] Basic chat interface
- [x] AI service integration

### Month 2-3: Multi-Model + Safety
- [ ] Complete AI provider integrations
- [ ] Content moderation pipeline
- [ ] Chat history and persistence
- [ ] Know Your AI guide
- [ ] AI Explorer (side-by-side comparison)

### Month 4: Pilot Features
- [ ] School/University pilot setup
- [ ] Analytics and reporting
- [ ] Policy controls and admin panel
- [ ] Enhanced AI recommendations

### Month 5+: Advanced Features
- [ ] Mobile app (React Native/Flutter)
- [ ] Offline learning packs
- [ ] TTS/ASR integration
- [ ] Classroom assignments
- [ ] Plagiarism detection and citation tools

## 🔒 Security Features

- **Content Moderation**: Multi-layer filtering and safety checks
- **Rate Limiting**: Per-user and per-organization limits
- **Role-Based Access Control**: Student, Teacher, Admin permissions
- **Data Encryption**: At-rest encryption for sensitive data
- **Audit Logging**: Comprehensive activity tracking
- **GDPR Compliance**: Data export and deletion capabilities

## 🌍 Internationalization

- **English** (Primary)
- **Bemba** (Zambia)
- **Nyanja** (Zambia)
- **Tonga** (Zambia)
- **Lozi** (Zambia)

## 📊 Analytics & Metrics

- **Learning Metrics**: Time on task, question diversity, model variety
- **Outcome Metrics**: Quiz improvement, assignment quality
- **System Metrics**: Latency, cost per session, safety incidents
- **Teacher Insights**: Student progress, usage patterns

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 📦 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker
```bash
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Email**: support@maano.ai
- **Discord**: [Community Server](link-to-discord)

## 🙏 Acknowledgments

- OpenAI, Anthropic, Google, and Alibaba for AI model access
- The React and Node.js communities
- Educational institutions participating in our pilot program
- The Maano AI development team

---

**Built with ❤️ for the future of education**

*Maano AI - Where Wisdom Meets Technology*
