# Contributing to Dev Dashboard

Thank you for your interest in contributing to the Dev Dashboard! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup
1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/Commissioner-deriv.git
   cd Commissioner-deriv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📋 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Provide detailed description of the problem
- Include steps to reproduce
- Add screenshots if applicable
- Specify browser and OS information

### Suggesting Features
- Open a GitHub issue with the "enhancement" label
- Describe the feature and its benefits
- Provide mockups or examples if possible
- Discuss implementation approach

### Code Contributions

#### 1. Choose an Issue
- Look for issues labeled "good first issue" for beginners
- Comment on the issue to indicate you're working on it
- Ask questions if anything is unclear

#### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

#### 3. Make Changes
- Follow the existing code style
- Write clear, descriptive commit messages
- Add tests for new functionality
- Update documentation as needed

#### 4. Test Your Changes
```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Test the build
npm run build
```

#### 5. Submit a Pull Request
- Push your branch to your fork
- Create a pull request with a clear title and description
- Link to any related issues
- Request review from maintainers

## 🎨 Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper TypeScript interfaces for props
- Follow the existing component structure

### CSS/Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design
- Test in both light and dark themes

### File Organization
```
app/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── api/                # API routes
├── auth/               # Authentication pages
└── globals.css         # Global styles

lib/                    # Utility functions and API clients
public/                 # Static assets
```

## 🧪 Testing Guidelines

### Component Testing
- Write tests for new components
- Test user interactions
- Test error states
- Use React Testing Library

### API Testing
- Test API endpoints
- Mock external dependencies
- Test error handling
- Validate response formats

### Integration Testing
- Test complete user flows
- Test authentication flows
- Test data fetching and display

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Update README for new features

### User Documentation
- Update user guides for new features
- Add screenshots for UI changes
- Update troubleshooting guides
- Keep deployment instructions current

## 🔒 Security Guidelines

### API Security
- Never commit API keys or secrets
- Use environment variables for configuration
- Validate all user inputs
- Follow OAuth best practices

### Data Privacy
- Minimize data collection
- Store data locally when possible
- Encrypt sensitive information
- Follow GDPR principles

## 🚀 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number bumped
- [ ] Changelog updated
- [ ] Security review completed

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow GitHub's community guidelines

### Communication
- Use clear, professional language
- Be patient with new contributors
- Ask questions when unsure
- Share knowledge and resources

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Documentation improvements
- `security` - Security-related issues

## 📞 Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Deriv API Documentation](https://developers.deriv.com)

### Contact
- GitHub Issues for bugs and features
- Discussions for questions and ideas
- Telegram for quick questions (link in dashboard)

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Invited to join the maintainers team (for significant contributions)

Thank you for contributing to make the Dev Dashboard better for everyone! 🚀