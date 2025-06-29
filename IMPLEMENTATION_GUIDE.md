# Complete Implementation Guide: DevOps and Code Refactoring Project

## Overview
You now have a complete project structure with all necessary files and documentation. Here's what you need to do step by step since you mentioned you don't know anything about this.

## PART A: DevOps Implementation (10%) - Step by Step

### Step 1: Set Up Jira Project (30 minutes)

1. **Go to Jira Cloud:**
   - Open browser and go to: https://www.atlassian.com/software/jira
   - Click "Get it free"
   - Create account with your email
   - Choose "Team-managed project"

2. **Create Your Project:**
   - Project name: "DevOps and Refactoring Project"
   - Project key: "DRP" (this will auto-generate)
   - Template: Choose "Scrum" or "Kanban"

3. **Invite Team Members:**
   - Click on "Project settings" (gear icon)
   - Click "People"
   - Click "Add people"
   - Enter email addresses of:
     - Your team members
     - Your instructor(s)
   - Set permission level: "Browse projects" for students, "Administer projects" for instructors

4. **Create Your First Issue:**
   - Click "Create Issue"
   - Issue Type: "Story"
   - Summary: "Setup DevOps Pipeline"
   - Description: "Implement complete CI/CD pipeline with Jenkins, Docker, and performance testing"
   - Assignee: Assign to yourself
   - Click "Create"

**Take screenshots of:**
- Jira project dashboard
- People section showing invited members
- Created issue

### Step 2: Set Up GitHub Repository (20 minutes)

1. **Create GitHub Account:**
   - Go to: https://github.com
   - Sign up if you don't have account
   - Verify your email

2. **Create Repository:**
   - Click "New repository" (green button)
   - Repository name: "devops-refactoring-project"
   - Description: "DevOps and Code Refactoring Project for [Your Course Name]"
   - Make it Public (so instructor can see)
   - Check "Add a README file"
   - Click "Create repository"

3. **Add Collaborators:**
   - In your repository, click "Settings" tab
   - Click "Manage access" in left sidebar
   - Click "Invite a collaborator"
   - Add your team members and instructor emails
   - They'll receive email invitations

4. **Upload Your Project Files:**
   ```powershell
   # Open PowerShell in your project folder
   cd "c:\Users\sword\Desktop\project"
   
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Commit files
   git commit -m "Initial project setup with DevOps pipeline"
   
   # Add your GitHub repository as remote (replace with your actual URL)
   git remote add origin https://github.com/YOUR-USERNAME/devops-refactoring-project.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

**Take screenshots of:**
- GitHub repository main page
- Collaborators page showing invited members
- Repository files uploaded

### Step 3: Install Jenkins (45 minutes)

1. **Install Java (Required for Jenkins):**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Install Java 11 or later
   - Verify installation: Open PowerShell and type `java -version`

2. **Download Jenkins:**
   - Go to: https://www.jenkins.io/download/
   - Download "Generic Java package (.war)"
   - Save to a folder like `C:\Jenkins\`

3. **Start Jenkins:**
   ```powershell
   # Navigate to Jenkins folder
   cd C:\Jenkins
   
   # Start Jenkins (this will keep running)
   java -jar jenkins.war --httpPort=8080
   ```

4. **Initial Jenkins Setup:**
   - Open browser and go to: http://localhost:8080
   - Find the initial admin password in the console output or at the file path shown
   - Copy and paste the password
   - Choose "Install suggested plugins"
   - Create your admin user account
   - Keep default Jenkins URL: http://localhost:8080

5. **Install Required Plugins:**
   - Go to "Manage Jenkins" → "Manage Plugins"
   - Click "Available" tab
   - Search and install these plugins:
     * "Jira Integration"
     * "GitHub Integration Plugin"
     * "Performance Plugin"
     * "Docker Pipeline"
     * "JMeter Plugin"
   - Click "Install without restart"

**Take screenshots of:**
- Jenkins dashboard after installation
- Plugin installation page
- List of installed plugins

### Step 4: Configure Jenkins Integrations (30 minutes)

1. **Configure GitHub Integration:**
   - Go to "Manage Jenkins" → "Configure System"
   - Find "GitHub" section
   - Click "Add GitHub Server"
   - Name: "GitHub"
   - API URL: https://api.github.com
   - Create a GitHub Personal Access Token:
     * Go to GitHub.com → Settings → Developer settings → Personal access tokens
     * Generate new token with "repo" permissions
     * Copy the token
   - Back in Jenkins: Add credentials using the token
   - Test connection

2. **Configure Jira Integration:**
   - In Jenkins "Configure System"
   - Find "Jira Steps" section
   - Add Jira site:
     * Name: "Your Jira Site"
     * URL: https://your-domain.atlassian.net (replace with your actual domain)
     * Username: Your email
     * Password: Create API token from Jira (Account Settings → Security → API tokens)

3. **Install Docker:**
   - Download Docker Desktop from: https://www.docker.com/products/docker-desktop
   - Install and start Docker Desktop
   - Verify installation: `docker --version` in PowerShell

4. **Configure Docker Hub Credentials:**
   - Create Docker Hub account at: https://hub.docker.com
   - In Jenkins: "Manage Jenkins" → "Manage Credentials"
   - Add new credential:
     * Type: "Username with password"
     * Username: Your Docker Hub username
     * Password: Your Docker Hub password
     * ID: "docker-hub-credentials"

### Step 5: Create Jenkins Pipeline Job (20 minutes)

1. **Create New Pipeline Job:**
   - On Jenkins dashboard, click "New Item"
   - Enter name: "DevOps-Refactoring-Pipeline"
   - Select "Pipeline"
   - Click "OK"

2. **Configure Pipeline:**
   - In "General" section: Add description
   - In "Pipeline" section:
     * Definition: "Pipeline script from SCM"
     * SCM: "Git"
     * Repository URL: Your GitHub repository URL
     * Credentials: Add your GitHub credentials if repository is private
     * Branch: "*/main"
     * Script Path: "Jenkinsfile"

3. **Set Up Webhooks (Optional but Recommended):**
   - In your GitHub repository: Settings → Webhooks
   - Add webhook:
     * Payload URL: http://your-jenkins-url:8080/github-webhook/
     * Content type: application/json
     * Events: Just push events

### Step 6: Install JMeter (15 minutes)

1. **Download JMeter:**
   - Go to: https://jmeter.apache.org/download_jmeter.cgi
   - Download "Binary" zip file
   - Extract to folder like `C:\JMeter\`

2. **Configure JMeter in Jenkins:**
   - "Manage Jenkins" → "Global Tool Configuration"
   - Find "JMeter" section
   - Add JMeter installation:
     * Name: "JMeter"
     * JMETER_HOME: Path to your JMeter folder (e.g., C:\JMeter\apache-jmeter-5.5)

### Step 7: Run Your First Pipeline (15 minutes)

1. **Update Your Code:**
   - Make sure all your project files are in GitHub
   - The Jenkinsfile should already be in your repository

2. **Run Pipeline:**
   - Go to your Jenkins job
   - Click "Build Now"
   - Watch the build progress
   - Check console output for any errors

3. **Fix Common Issues:**
   - If npm commands fail: Make sure Node.js is installed on Jenkins server
   - If Docker commands fail: Ensure Docker is running
   - If Jira integration fails: Check credentials and site URL

**Take screenshots of:**
- Successful pipeline execution
- JMeter performance test results
- Docker image build logs

### Step 8: Team Member Tasks (15 minutes each)

Each team member should:

1. **Pull Docker Image:**
   ```powershell
   # Pull the image (replace with actual Docker Hub username)
   docker pull YOUR-DOCKERHUB-USERNAME/devops-refactoring-project:latest
   
   # Run the container
   docker run -d --name my-devops-app -p 3000:3000 YOUR-DOCKERHUB-USERNAME/devops-refactoring-project:latest
   
   # Test the application
   # Open browser and go to: http://localhost:3000
   ```

2. **Take Screenshots:**
   - Docker pull command execution
   - Running container (`docker ps`)
   - Application working in browser

## PART B: Code Refactoring Implementation (5%) - Step by Step

### Step 1: Analyze the Original Code (20 minutes)

1. **Open the Original Code:**
   - Look at `src/app.js` in your project
   - Read through the code line by line

2. **Identify Code Smells:**
   - **Code Smell #1:** Lines 7-8 - Hardcoded values
   - **Code Smell #2:** Lines 11-70 - Large function with multiple responsibilities
   - **Code Smell #3:** Validation logic duplication in multiple functions

3. **Document Your Findings:**
   - Create a document explaining each code smell
   - Explain why each is problematic
   - Reference specific line numbers

### Step 2: Explain Detection Methods (15 minutes)

1. **Manual Detection:**
   - Code review checklist
   - Reading code for patterns
   - Looking for complexity indicators

2. **Automated Tools:**
   - ESLint for JavaScript
   - SonarQube for comprehensive analysis
   - Complexity analysis tools

### Step 3: Apply Refactoring Techniques (30 minutes)

1. **Review Refactored Code:**
   - Look at `src/app-refactored.js`
   - Compare with original code
   - Understand the improvements made

2. **Key Refactoring Applied:**
   - **Extract Method:** Separated validation logic into ValidationService
   - **Extract Class:** Created UserService and UserController classes
   - **Replace Magic Numbers:** Used environment variables
   - **Remove Duplication:** Centralized validation logic

### Step 4: Performance Testing (20 minutes)

1. **Run Original Code Tests:**
   ```powershell
   # Test original application
   npm start
   # In another PowerShell window:
   npm test
   ```

2. **Run Refactored Code Tests:**
   ```powershell
   # Stop original app (Ctrl+C)
   # Start refactored app
   node src/app-refactored.js
   # Run refactored tests
   npm run test:refactored
   ```

3. **Compare Results:**
   - Look at test execution times
   - Check code coverage reports
   - Document performance differences

### Step 5: Create Performance Benchmarks (BONUS - 15 minutes)

1. **Use JMeter for Load Testing:**
   - Run the provided JMeter test plan against both versions
   - Compare response times and throughput

2. **Document Results:**
   - Create comparison charts
   - Calculate percentage improvements
   - Explain the reasons for performance gains

## Recording and Documentation Requirements

### What to Record (Video):
1. **Jira Setup:** Project creation and team invitation
2. **GitHub Setup:** Repository creation and collaboration
3. **Jenkins Installation:** Plugin installation and configuration
4. **Pipeline Execution:** Complete build and deployment process
5. **Docker Operations:** Image building and team member pulling
6. **Code Analysis:** Showing code smells and refactored solutions
7. **Performance Testing:** Running tests and comparing results

### What to Document (Written):
1. **Screenshots:** Every major step with explanatory captions
2. **Configuration Files:** All settings and configurations used
3. **Code Examples:** Before and after code comparisons
4. **Test Results:** Performance metrics and improvements
5. **Team Verification:** Screenshots from each team member
6. **Troubleshooting:** Issues encountered and solutions

### Submission Checklist:
- [ ] Video recording (10-15 minutes total)
- [ ] Written documentation with screenshots
- [ ] GitHub repository URL with all code
- [ ] Jira project URL (public access for instructor)
- [ ] Docker Hub repository URL
- [ ] Performance test results and comparisons
- [ ] Team member verification screenshots
- [ ] Refactoring analysis document

## Common Issues and Solutions

### Jenkins Issues:
- **Port 8080 in use:** Change to different port with `--httpPort=8081`
- **Permission denied:** Run PowerShell as Administrator
- **Plugin installation fails:** Check internet connection and Jenkins version

### Docker Issues:
- **Docker not running:** Start Docker Desktop application
- **Build fails:** Check Dockerfile syntax and base image availability
- **Push fails:** Verify Docker Hub credentials

### Git Issues:
- **Authentication failed:** Use personal access token instead of password
- **Repository not found:** Check repository URL and permissions
- **Push rejected:** Pull latest changes first

### Performance Testing Issues:
- **JMeter not found:** Verify JMeter installation path in Jenkins
- **Application not responding:** Ensure application is running before tests
- **No performance improvement:** This is normal; document actual results

## Success Criteria

### Part A (DevOps):
- ✅ Functional Jira project with team collaboration
- ✅ GitHub repository with complete codebase
- ✅ Jenkins pipeline running successfully
- ✅ Jira integration updating issues automatically
- ✅ Performance tests integrated and running
- ✅ Docker image built and pushed to Docker Hub
- ✅ Team members successfully pulling and running Docker image
- ✅ Complete documentation and video recording

### Part B (Code Refactoring):
- ✅ At least 2 code smells identified and explained
- ✅ Detection methods documented
- ✅ Refactoring techniques applied and explained
- ✅ Refactored code runs successfully
- ✅ Performance comparison completed (bonus)
- ✅ Complete analysis documentation

## Final Notes

- **Start Early:** This project requires coordination between team members
- **Test Everything:** Verify each step works before moving to the next
- **Document Everything:** Take screenshots and notes throughout the process
- **Collaborate:** Use Jira and GitHub for team coordination
- **Ask for Help:** Don't hesitate to reach out if you encounter issues

Remember: The goal is to learn DevOps practices and code quality principles. Focus on understanding the concepts, not just completing the tasks.
