# DevOps and Code Refactoring Project

## Quick Start Guide

### Prerequisites
- Node.js 16+ installed
- Docker installed
- Git installed
- Jenkins (optional for CI/CD)

### Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/devops-refactoring-project.git
cd devops-refactoring-project
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the application:**
```bash
npm start
```

4. **Run tests:**
```bash
npm test
```

5. **Build Docker image:**
```bash
docker build -t devops-project .
```

6. **Run with Docker:**
```bash
docker run -p 3000:3000 devops-project
```

### API Endpoints
- `GET /` - Project information
- `GET /health` - Health check
- `POST /register` - User registration
- `POST /login` - User login

### Project Structure
```
project/
├── src/
│   ├── app.js              # Original application (with code smells)
│   └── app-refactored.js   # Refactored application
├── tests/
│   ├── api.test.js         # Tests for original code
│   └── api-refactored.test.js # Tests for refactored code
├── jmeter/
│   └── performance-test.jmx # JMeter performance test plan
├── docs/
│   ├── part-a-devops-guide.md
│   └── part-b-refactoring-guide.md
├── Dockerfile              # Docker configuration
├── Jenkinsfile            # Jenkins pipeline configuration
└── package.json           # Node.js dependencies
```

### What You Need to Do

#### Part A: DevOps (10%)
1. **Jira Setup**: Create project and invite team members
2. **GitHub Setup**: Create repository and add collaborators
3. **Jenkins Setup**: Install plugins and configure integrations
4. **Pipeline**: Set up automated CI/CD pipeline
5. **Performance Testing**: Configure JMeter integration
6. **Docker**: Build and deploy container images
7. **Documentation**: Record all steps and submit

#### Part B: Code Refactoring (5%)
1. **Code Analysis**: Review provided code examples
2. **Identify Code Smells**: Find at least 2 code smell types
3. **Detection Methods**: Explain how to detect code smells
4. **Refactoring**: Fix the identified issues
5. **Performance Testing**: Compare before/after performance
6. **Documentation**: Document the entire process

### Getting Help
- Read the detailed guides in the `docs/` folder
- Check the example code in `src/` folder
- Review test files for understanding expected behavior
- Use the provided Docker and Jenkins configurations as starting points

### Submission Requirements
- Complete video recording of all DevOps steps
- GitHub repository with all code and configurations
- Jira project showing issue tracking
- Docker Hub repository with pushed images
- Performance test results and comparisons
- Detailed documentation of refactoring process
