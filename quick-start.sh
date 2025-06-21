#!/bin/bash

# Boovy Quick Start Script
echo "🚀 Starting Boovy - Vibe-Based Coding Platform"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the Boovy root directory"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Check if .env exists, if not create it
if [ ! -f ".env" ]; then
    echo ""
    echo "🔑 Setting up Claude API key..."
    echo "Please enter your Claude API key:"
    read -s CLAUDE_API_KEY
    
    cat > .env << EOF
# Boovy Backend Environment Variables
PORT=3001
NODE_ENV=development
CLAUDE_API_KEY=$CLAUDE_API_KEY
EOF
    echo "✅ API key configured!"
else
    echo "✅ Environment file already exists!"
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo ""
echo "🎉 Setup complete! Starting Boovy..."

# Start backend
echo "🔧 Starting backend server..."
cd ../backend
npm run dev &
BACKEND_PID=$!

# Start frontend
echo "🎨 Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Boovy is running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

