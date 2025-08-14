#!/bin/bash

echo "🚀 Maano AI - Platform Setup"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Backend setup
echo "🔧 Setting up Backend..."
cd backend

if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found. Please ensure you're in the correct directory."
    exit 1
fi

echo "📦 Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Backend dependency installation failed."
    exit 1
fi

echo "✅ Backend dependencies installed"
echo ""

# Frontend setup
echo "🎨 Setting up Frontend..."
cd ../frontend

if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found. Please ensure you're in the correct directory."
    exit 1
fi

echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Frontend dependency installation failed."
    exit 1
fi

echo "✅ Frontend dependencies installed"
echo ""

# Create environment file
echo "⚙️  Creating environment configuration..."
cd ../backend

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file from template"
        echo "⚠️  Please edit .env file with your configuration before starting the servers"
    else
        echo "⚠️  No .env.example found. Please create .env file manually."
        echo "   Required variables:"
        echo "   - PORT=5000"
        echo "   - JWT_SECRET=your-secret-key"
        echo "   - OPENAI_API_KEY=your-openai-key"
        echo "   - ANTHROPIC_API_KEY=your-anthropic-key"
        echo "   - GEMINI_API_KEY=your-gemini-key"
        echo "   - QWEN_API_KEY=your-qwen-key"
    fi
else
    echo "✅ .env file already exists"
fi

echo ""

# Return to root directory
cd ..

echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your .env file in the backend directory"
echo "2. Set up your databases (PostgreSQL, MongoDB, Redis)"
echo "3. Get API keys from AI providers"
echo "4. Start the backend: cd backend && npm run dev"
echo "5. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📚 For more information, see the README.md file"
echo ""
echo "Happy coding! 🚀" 