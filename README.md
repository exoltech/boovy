# 🚀 Boovy - Vibe-Based Coding Platform

<div align="center">

![Boovy Logo](https://img.shields.io/badge/Boovy-Vibe--Based%20Coding-blue?style=for-the-badge&logo=react)

**Generate full-stack web applications from natural language prompts using AI**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4-green?style=flat-square&logo=express)](https://expressjs.com/)
[![Claude API](https://img.shields.io/badge/Claude-API-orange?style=flat-square)](https://www.anthropic.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Demo](#demo) • [Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

## ✨ Features

### 🎨 **Three Unique Themes**
- **Neon**: Cyberpunk blue/pink aesthetic with animated particles
- **Retro**: Green terminal hacker style with scanlines
- **Lo-Fi**: Beige/green relaxed vibe with gentle animations

### 🤖 **AI-Powered Code Generation**
- Natural language prompts to full app configurations
- Claude API integration for intelligent parsing
- Automatic template selection and customization

### 📝 **Monaco Code Editor**
- Full-featured code editor with syntax highlighting
- Support for TypeScript, JavaScript, JSON, CSS, and more
- Real-time code preview and editing

### 🏗️ **Template System**
- **SaaS Stripe Auth**: Subscription apps with Stripe payments
- **Portfolio Blog**: Personal websites with Markdown support
- **Firebase Journal**: Personal apps with real-time database
- **Basic Landing**: Simple marketing and landing pages

### ⚡ **Advanced Features**
- Terminal-style command interface with history
- ZIP export of generated code
- Responsive design for all devices
- Real-time animated backgrounds using Three.js
- Security middleware and input validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Claude API key from [Anthropic](https://www.anthropic.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/boovy.git
   cd boovy
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cd ../backend
   cp .env.example .env
   ```
   
   Edit `.env` and add your Claude API key:
   ```env
   CLAUDE_API_KEY=your_claude_api_key_here
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev
   
   # Terminal 2: Start frontend
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Select a theme** using the theme toggle buttons
2. **Enter a prompt** in the terminal interface:
   - "Create a SaaS app with Stripe payments and user auth"
   - "Build a personal blog with dark mode"
   - "Make a todo app with Firebase backend"
3. **Press Enter** to generate the app configuration
4. **View the generated code** in the Monaco editor
5. **Download** the complete project as a ZIP file

## 🏗️ Project Structure

```
boovy/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   └── components/      # React components
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Express.js API server
│   ├── routes/             # API routes
│   ├── utils/              # Utilities and middleware
│   ├── temp/               # Temporary file storage
│   └── package.json
├── templates/              # Code generation templates
│   ├── saas-stripe-auth/   # SaaS template
│   ├── portfolio-blog/     # Blog template
│   ├── firebase-journal/   # Journal template
│   └── basic-landing/      # Landing page template
├── docs/                   # Documentation
├── README.md
└── package.json
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/generate` | Generate app configuration from prompt |
| `POST` | `/api/scaffold` | Create code structure from configuration |
| `GET` | `/api/download/:id` | Download generated code as ZIP |
| `GET` | `/health` | Health check endpoint |

## 🎯 Templates

### SaaS Stripe Auth
Perfect for subscription-based applications with:
- User authentication via Supabase
- Stripe payment integration
- Dashboard interface
- Subscription management

### Portfolio Blog
Ideal for personal websites featuring:
- Markdown blog posts
- Dark/light mode toggle
- Responsive design
- SEO optimization

### Firebase Journal
Great for personal applications with:
- Real-time database
- User authentication
- CRUD operations
- Responsive UI

### Basic Landing
Simple marketing pages with:
- Hero sections
- Feature highlights
- Contact forms
- Modern design

## 🚀 Deployment

### Quick Deploy Options

#### Vercel + Railway (Recommended)
- **Frontend**: Deploy to [Vercel](https://vercel.com)
- **Backend**: Deploy to [Railway](https://railway.app)

#### Docker
```bash
docker-compose up -d
```

#### Traditional VPS
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🛠️ Development

### Adding New Templates
1. Create template directory in `templates/`
2. Add template files with variable placeholders (`{{VARIABLE}}`)
3. Update template matching logic in `backend/routes/scaffold.js`

### Customizing Themes
- Edit CSS variables in `frontend/src/app/globals.css`
- Modify animations in `frontend/src/app/theme-enhancements.css`
- Update particle effects in `frontend/src/components/AnimatedBackground.tsx`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for the Claude API
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Three.js](https://threejs.org/) for 3D animations
- [Next.js](https://nextjs.org/) and [Express.js](https://expressjs.com/) for the framework

## 📞 Support

- 📧 Email: support@boovy.dev
- 💬 Discord: [Join our community](https://discord.gg/boovy)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/boovy/issues)
- 📖 Docs: [Documentation](./docs/)

---

<div align="center">

**Made with ❤️ by the Boovy Team**

[⭐ Star us on GitHub](https://github.com/yourusername/boovy) • [🐦 Follow on Twitter](https://twitter.com/boovy_dev)

</div>

