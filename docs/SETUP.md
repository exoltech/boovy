# Boovy Setup Guide

## Quick Start

Boovy is a full-stack web application that generates complete web applications from natural language prompts using the Claude API.

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Claude API key from Anthropic (required for app generation)

### Installation

1. **Clone or extract the Boovy project**
   ```bash
   cd boovy
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cd ../backend
   cp .env.example .env
   ```
   
   Edit `.env` and add your Claude API key:
   ```
   CLAUDE_API_KEY=your_claude_api_key_here
   PORT=3001
   NODE_ENV=development
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:3001

2. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:3000

3. **Open your browser**
   Navigate to http://localhost:3000

## Features

### 🎨 Three Unique Themes
- **Neon**: Cyberpunk blue/pink aesthetic with animated particles
- **Retro**: Green terminal hacker style with scanlines
- **Lo-Fi**: Beige/green relaxed vibe with gentle animations

### 🤖 AI-Powered Code Generation
- Natural language prompts to app configurations
- Claude API integration for intelligent parsing
- Automatic template selection and customization

### 📝 Monaco Code Editor
- Full-featured code editor with syntax highlighting
- Support for TypeScript, JavaScript, JSON, CSS, and more
- Real-time code preview and editing

### 🏗️ Template System
- **SaaS Stripe Auth**: Subscription apps with Stripe payments
- **Portfolio Blog**: Personal websites with Markdown support
- **Firebase Journal**: Personal apps with real-time database
- **Basic Landing**: Simple marketing and landing pages

### ⚡ Advanced Features
- Terminal-style command interface
- ZIP export of generated code
- Responsive design for all devices
- Real-time animated backgrounds
- Command history navigation

## Usage

1. **Select a theme** using the theme toggle buttons
2. **Enter a prompt** in the terminal interface, such as:
   - "Create a SaaS app with Stripe payments and user auth"
   - "Build a personal blog with dark mode"
   - "Make a todo app with Firebase backend"
3. **Press Enter** to generate the app configuration
4. **View the generated code** in the Monaco editor
5. **Download** the complete project as a ZIP file

## API Endpoints

### POST /api/generate
Generates app configuration from natural language prompt.

### POST /api/scaffold
Creates code structure from configuration.

### GET /api/download/:id
Downloads generated code as ZIP file.

### GET /health
Health check endpoint.

## Troubleshooting

### Claude API Issues
- Ensure you have a valid Claude API key
- Check your API key has sufficient credits
- Verify the key is correctly set in `.env`

### Port Conflicts
- Backend default: 3001
- Frontend default: 3000
- Change ports in package.json scripts if needed

### Dependencies
- Run `npm install` in both frontend and backend directories
- Clear node_modules and reinstall if issues persist

## Development

### Project Structure
```
boovy/
├── frontend/          # Next.js application
├── backend/           # Express.js API server
├── templates/         # Code generation templates
└── docs/             # Documentation
```

### Adding New Templates
1. Create template directory in `templates/`
2. Add template files with variable placeholders
3. Update template matching logic in backend

### Customizing Themes
- Edit `frontend/src/app/globals.css` for theme variables
- Modify `frontend/src/app/theme-enhancements.css` for animations
- Update `AnimatedBackground.tsx` for particle effects

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Railway/Heroku)
```bash
cd backend
npm start
```

### Environment Variables for Production
```
CLAUDE_API_KEY=your_production_key
NODE_ENV=production
PORT=3001
```

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Ensure all dependencies are installed
4. Verify environment variables are set correctly

## License

MIT License - Feel free to modify and distribute.

