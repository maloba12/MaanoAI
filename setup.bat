@echo off
chcp 65001 >nul
echo 🚀 Maano AI - Platform Setup
echo ==============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 18 (
    echo ❌ Node.js version 18+ is required. Current version: 
    node --version
    pause
    exit /b 1
)

echo ✅ Node.js version detected:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm version detected:
npm --version
echo.

REM Backend setup
echo 🔧 Setting up Backend...
cd backend

if not exist "package.json" (
    echo ❌ Backend package.json not found. Please ensure you're in the correct directory.
    pause
    exit /b 1
)

echo 📦 Installing backend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed.
    pause
    exit /b 1
)

echo ✅ Backend dependencies installed
echo.

REM Frontend setup
echo 🎨 Setting up Frontend...
cd ..\frontend

if not exist "package.json" (
    echo ❌ Frontend package.json not found. Please ensure you're in the correct directory.
    pause
    exit /b 1
)

echo 📦 Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed.
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed
echo.

REM Create environment file
echo ⚙️  Creating environment configuration...
cd ..\backend

if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo ✅ Created .env file from template
        echo ⚠️  Please edit .env file with your configuration before starting the servers
    ) else (
        echo ⚠️  No .env.example found. Please create .env file manually.
        echo    Required variables:
        echo    - PORT=5000
        echo    - JWT_SECRET=your-secret-key
        echo    - OPENAI_API_KEY=your-openai-key
        echo    - ANTHROPIC_API_KEY=your-anthropic-key
        echo    - GEMINI_API_KEY=your-gemini-key
        echo    - QWEN_API_KEY=your-qwen-key
    )
) else (
    echo ✅ .env file already exists
)

echo.

REM Return to root directory
cd ..

echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Configure your .env file in the backend directory
echo 2. Set up your databases (PostgreSQL, MongoDB, Redis)
echo 3. Get API keys from AI providers
echo 4. Start the backend: cd backend ^&^& npm run dev
echo 5. Start the frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 The application will be available at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo.
echo 📚 For more information, see the README.md file
echo.
echo Happy coding! 🚀
pause 