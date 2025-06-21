# 🚀 GitHub Repository Setup Instructions

## Quick Setup

1. **Extract the archive**
   ```bash
   tar -xzf boovy-github-ready.tar.gz
   cd boovy-github
   ```

2. **Run the setup script**
   ```bash
   ./setup.sh
   ```

3. **Add your Claude API key**
   ```bash
   # Edit backend/.env and add your Claude API key
   CLAUDE_API_KEY=your_actual_api_key_here
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## Creating a GitHub Repository

### Option 1: GitHub CLI (Recommended)
```bash
# Install GitHub CLI if you haven't already
# Visit: https://cli.github.com/

# Create repository
gh repo create boovy --public --source=. --remote=origin --push

# Or for private repository
gh repo create boovy --private --source=. --remote=origin --push
```

### Option 2: GitHub Web Interface
1. Go to [GitHub](https://github.com) and create a new repository named "boovy"
2. Don't initialize with README, .gitignore, or license (we already have these)
3. Run these commands in your project directory:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Boovy v1.0.0"
   git branch -M main
   git remote add origin https://github.com/yourusername/boovy.git
   git push -u origin main
   ```

### Option 3: Git Commands Only
```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Boovy v1.0.0

🎉 Features:
- AI-powered code generation with Claude API
- Three unique themes (Neon, Retro, Lo-Fi)
- Monaco code editor integration
- Template system with 4 starter templates
- Full-stack Next.js + Express.js architecture"

# Add your remote repository
git remote add origin https://github.com/yourusername/boovy.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Repository Structure

Your GitHub repository will include:

```
boovy/
├── .github/                 # GitHub templates and workflows
│   ├── ISSUE_TEMPLATE/     # Bug report and feature request templates
│   ├── workflows/          # CI/CD workflows
│   └── pull_request_template.md
├── .vscode/                # VS Code settings and extensions
├── docs/                   # Documentation
├── frontend/               # Next.js application
├── backend/                # Express.js API
├── templates/              # Code generation templates
├── README.md              # Main documentation
├── CONTRIBUTING.md        # Contribution guidelines
├── LICENSE                # MIT license
├── CHANGELOG.md           # Version history
├── docker-compose.yml     # Development Docker setup
├── docker-compose.prod.yml # Production Docker setup
├── .gitignore            # Git ignore rules
├── .env.example          # Environment variables template
├── package.json          # Root package configuration
└── setup.sh              # Quick setup script
```

## Environment Variables

Before pushing to GitHub, make sure to:

1. **Never commit your actual API keys**
   - The `.env` file is already in `.gitignore`
   - Only commit `.env.example` with placeholder values

2. **Set up repository secrets** (for GitHub Actions):
   - Go to Settings > Secrets and variables > Actions
   - Add `CLAUDE_API_KEY` for CI/CD workflows

## Deployment Setup

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Railway (Backend)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main

### Docker
```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

## Collaboration Features

Your repository includes:
- **Issue templates** for bug reports and feature requests
- **Pull request template** for consistent code reviews
- **GitHub Actions** for automated testing and deployment
- **Contributing guidelines** for new contributors
- **Code of conduct** for community standards

## Next Steps

1. **Customize the README** with your specific details
2. **Set up branch protection** rules for main branch
3. **Configure GitHub Actions** with your deployment secrets
4. **Add collaborators** and set up teams
5. **Create your first release** tag

## Support

If you need help setting up the repository:
- Check the [CONTRIBUTING.md](./CONTRIBUTING.md) guide
- Review the [documentation](./docs/) folder
- Create an issue using the provided templates

Happy coding! 🎨

