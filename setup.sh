#!/bin/bash

# Boovy Quick Setup Script
# This script helps you get Boovy up and running quickly

set -e

echo "🚀 Welcome to Boovy Setup!"
echo "=========================="

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the Boovy root directory"
    exit 1
fi

echo "📦 Installing dependencies..."

# Install root dependencies
npm install

# Install frontend dependencies
echo "📱 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "🔧 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "⚙️  Setting up environment..."

# Copy environment file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "📝 Created backend/.env file"
    echo "   ⚠️  Please add your Claude API key to backend/.env"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your Claude API key to backend/.env"
echo "2. Run 'npm run dev' to start the development servers"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For more information, see README.md"
echo ""
echo "Happy coding! 🎨"

