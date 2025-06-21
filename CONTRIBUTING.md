# Contributing to Boovy

Thank you for your interest in contributing to Boovy! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Claude API key (for testing generation features)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/boovy.git
   cd boovy
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Add your Claude API key to .env
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

feat(frontend): add new theme selector component
fix(backend): resolve Claude API timeout issue
docs(readme): update installation instructions
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

## 🏗️ Project Structure

```
boovy/
├── frontend/           # Next.js React application
├── backend/           # Express.js API server
├── templates/         # Code generation templates
├── docs/             # Documentation
└── scripts/          # Build and deployment scripts
```

### Frontend (`/frontend`)
- Next.js 14 with App Router
- TypeScript and Tailwind CSS
- Monaco Editor integration
- Three.js for animations

### Backend (`/backend`)
- Express.js with TypeScript
- Claude API integration
- Template processing system
- Security middleware

### Templates (`/templates`)
- Starter application templates
- Variable substitution system
- Support for multiple frameworks

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:backend
```

### Writing Tests
- Write unit tests for new functions
- Add integration tests for API endpoints
- Test UI components with React Testing Library
- Ensure templates generate valid code

## 🎨 Adding New Features

### Adding a New Theme
1. Define CSS variables in `frontend/src/app/globals.css`
2. Add theme animations in `frontend/src/app/theme-enhancements.css`
3. Update `AnimatedBackground.tsx` for particle effects
4. Add theme option to `ThemeToggle.tsx`

### Adding a New Template
1. Create template directory in `templates/`
2. Add template files with `{{VARIABLE}}` placeholders
3. Update template matching in `backend/routes/scaffold.js`
4. Add template documentation

### Adding API Endpoints
1. Create route file in `backend/routes/`
2. Add validation middleware
3. Implement error handling
4. Add API documentation
5. Write integration tests

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node.js version, etc.)
- Screenshots if applicable

Use the bug report template in GitHub Issues.

## 💡 Feature Requests

For feature requests:
- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider alternative solutions
- Provide mockups or examples if helpful

## 📖 Documentation

### Updating Documentation
- Keep README.md up to date
- Document new API endpoints
- Update setup instructions for new dependencies
- Add examples for new features

### Writing Style
- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Test all instructions

## 🔍 Code Review Process

1. **Create a Pull Request**
   - Use the PR template
   - Link related issues
   - Provide clear description
   - Add screenshots for UI changes

2. **Review Checklist**
   - Code follows style guidelines
   - Tests pass and coverage is maintained
   - Documentation is updated
   - No breaking changes (or properly documented)

3. **Approval Process**
   - At least one maintainer approval required
   - All CI checks must pass
   - Address review feedback

## 🚀 Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes

### Release Steps
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to production
5. Announce release

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the issue, not the person

### Getting Help
- Check existing issues and documentation
- Ask questions in GitHub Discussions
- Join our Discord community
- Tag maintainers for urgent issues

## 🏆 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes
- Invited to the contributors Discord channel

## 📞 Contact

- **Maintainers**: @maintainer1, @maintainer2
- **Discord**: [Boovy Community](https://discord.gg/boovy)
- **Email**: contributors@boovy.dev

Thank you for contributing to Boovy! 🎉

