# Part A: DevOps Implementation2. **Create GitHub Repository:**
   - Go to https://github.com
   - Click "New repository"
   - Repository name: "ddevops-refactoring-project"
   - Make it public or private (as per requirements)
   - Initialize with README
   - **Your repository URL:** https://github.com/matin235-ops/ddevops-refactoring-project (10%)

This guide provides step-by-step instructions for implementing the DevOps pipeline requirements.

## 1. Create Jira Project Account and Invite Team Members

### Steps:
1. **Sign up for Jira Cloud:**
   - Go to https://www.atlassian.com/software/jira
   - Click "Get it free" and create an account
   - Choose "Project Management" template

2. **Create a New Project:**
   - Click "Create Project"
   - Select "Scrum" or "Kanban" template
   - Project name: "DevOps and Refactoring Project"
   - Project key: "DRP"

3. **Invite Team Members and Instructors:**
   - Go to Project Settings → People
   - Click "Add people to project"
   - Enter email addresses of team members and instructors
   - Set appropriate permissions (Admin for instructors, Developer for team members)

### Deliverable:
- Screenshot of Jira project dashboard
- Screenshot showing invited team members

## 2. Create GitHub Repository and Invite Collaborators

### Steps:
1. **Create GitHub Repository:**
   - Go to https://github.com
   - Click "New repository"
   - Repository name: "devops-refactoring-project"
   - Make it public or private (as per requirements)
   - Initialize with README

2. **Invite Collaborators:**
   - Go to Settings → Manage access
   - Click "Invite a collaborator"
   - Add team members and instructors
   - Give appropriate permissions

3. **Setup Repository Structure:**
   ```
   devops-refactoring-project/
   ├── src/                    # Application source code
   ├── tests/                  # Test files
   ├── jenkins/               # Jenkins configurations
   ├── docker/                # Docker configurations
   ├── jmeter/                # JMeter test plans
   ├── docs/                  # Documentation
   ├── Dockerfile
   ├── Jenkinsfile
   ├── package.json
   └── README.md
   ```

### Deliverable:
- GitHub repository URL: https://github.com/matin235-ops/ddevops-refactoring-project
- Screenshot of repository with collaborators

## 3. Install and Setup Jenkins with Required Plugins

### Prerequisites:
- Java 11 or later installed
- Docker installed
- JMeter installed

### Jenkins Installation:
1. **Download and Install Jenkins:**
   ```powershell
   # Download Jenkins WAR file
   wget https://get.jenkins.io/war-stable/2.414.1/jenkins.war
   
   # Start Jenkins
   java -jar jenkins.war --httpPort=8080
   ```

2. **Initial Setup:**
   - Open http://localhost:8080
   - Follow setup wizard
   - Install suggested plugins

3. **Install Required Plugins:**
   - Go to Manage Jenkins → Manage Plugins
   - Install these plugins:
     * **Jira Integration Plugin**
     * **GitHub Integration Plugin**
     * **Performance Testing Plugin**
     * **Docker Pipeline Plugin**
     * **JMeter Plugin**

### Plugin Configurations:

#### Jira Integration:
1. Go to Manage Jenkins → Configure System
2. Find "Jira Steps" section
3. Add Jira site:
   - Name: "Your Jira Site"
   - URL: "https://your-domain.atlassian.net"
   - Username: your-email@domain.com
   - API Token: (Generate from Jira Account Settings)

#### GitHub Integration:
1. Go to Manage Jenkins → Configure System
2. Find "GitHub" section
3. Add GitHub Server:
   - API URL: https://api.github.com
   - Credentials: Add GitHub personal access token

#### Docker Hub Integration:
1. Go to Manage Jenkins → Manage Credentials
2. Add Docker Hub credentials:
   - Username: Your Docker Hub username
   - Password: Your Docker Hub password
   - ID: "docker-hub-credentials"

### Deliverable:
- Screenshot of Jenkins dashboard
- Screenshot of installed plugins
- Screenshot of configured integrations

## 4. Create Jira Issue and Integrate with Jenkins

### Steps:
1. **Create Jira Issue:**
   - Go to your Jira project
   - Click "Create Issue"
   - Issue Type: Story or Task
   - Summary: "Implement DevOps Pipeline"
   - Description: "Setup complete CI/CD pipeline with testing and deployment"
   - Assign to team member

2. **Branch Naming Convention:**
   - Create branches with format: `feature/DRP-{issue-number}`
   - Example: `feature/DRP-1`

3. **Jenkins Integration:**
   - The Jenkinsfile includes Jira integration
   - Issues are automatically updated when pipeline runs
   - Comments are added to Jira issues with build status

### Deliverable:
- Screenshot of created Jira issue
- Screenshot of Jira issue updated by Jenkins

## 5. Commit and Push Project to GitHub

### Steps:
1. **Initialize Git Repository:**
   ```powershell
   cd c:\Users\sword\Desktop\project
   git init
   git add .
   git commit -m "Initial project setup with DevOps pipeline"
   ```

2. **Add Remote and Push:**
   ```powershell
   git remote add origin https://github.com/your-username/devops-refactoring-project.git
   git branch -M main
   git push -u origin main
   ```

3. **Create Feature Branch:**
   ```powershell
   git checkout -b feature/DRP-1
   git push -u origin feature/DRP-1
   ```

4. **Configure Jenkins Pipeline:**
   - Create new Pipeline job in Jenkins
   - Configure to use Jenkinsfile from repository
   - Set up webhooks for automatic builds

### Deliverable:
- GitHub repository with all project files
- Jenkins job successfully pulling from GitHub

## 6. Performance Testing with JMeter Integration

### JMeter Test Plan Features:
- **Load Testing:** 50 concurrent users, 10 iterations
- **Endpoints Tested:**
  - Health check endpoint
  - Home page endpoint
  - API endpoints
- **Assertions:** Response code validation
- **Results:** Exported to JTL format for Jenkins

### Jenkins Integration:
- JMeter tests run automatically in pipeline
- Results published to Jenkins dashboard
- Performance trends tracked over time

### Deliverable:
- JMeter test plan file
- Jenkins performance test reports
- Performance trends dashboard

## 7. Docker Image Creation and Docker Hub Deployment

### Docker Configuration:
- **Dockerfile:** Multi-stage build for optimization
- **Health Checks:** Automated container health monitoring
- **Security:** Non-root user, minimal base image

### Jenkins Docker Pipeline:
1. Build Docker image with build number tag
2. Tag as "latest"
3. Push to Docker Hub
4. Deploy container for testing

### Deliverable:
- Docker Hub repository with pushed images
- Screenshot of successful Docker build in Jenkins

## 8. Team Member Docker Image Pull

### Instructions for Team Members:
```powershell
# Pull the Docker image
docker pull your-dockerhub-username/devops-refactoring-project:latest

# Run the container
docker run -d --name devops-app -p 3000:3000 your-dockerhub-username/devops-refactoring-project:latest

# Verify the application
curl http://localhost:3000/health
```

### Verification:
- Application accessible on http://localhost:3000
- Health check returns status OK
- All endpoints functioning correctly

### Deliverable:
- Screenshots from each team member showing:
  - Docker pull command execution
  - Running container
  - Application working locally

## 9. Recording and Documentation Requirements

### Video Recording Checklist:
- [ ] Jira project creation and team invitation
- [ ] GitHub repository setup and collaboration
- [ ] Jenkins installation and plugin configuration
- [ ] Pipeline execution with Jira integration
- [ ] JMeter performance testing
- [ ] Docker image build and push
- [ ] Team member pulling and running Docker image

### Documentation Requirements:
- [ ] Step-by-step screenshots for each process
- [ ] Configuration files and scripts
- [ ] Team member verification screenshots
- [ ] Performance test results
- [ ] Pipeline execution logs

### Submission Format:
- Video recording (screen capture)
- Document with screenshots and explanations
- GitHub repository link
- Jira project link
- Docker Hub repository link

## Troubleshooting Common Issues

### Jenkins Issues:
- **Plugin Installation Fails:** Check internet connectivity and Jenkins version compatibility
- **Jira Integration Not Working:** Verify API token and site URL
- **Docker Build Fails:** Ensure Docker daemon is running

### Docker Issues:
- **Image Won't Build:** Check Dockerfile syntax and base image availability
- **Push to Docker Hub Fails:** Verify credentials and repository permissions
- **Container Won't Start:** Check port conflicts and resource availability

### JMeter Issues:
- **Tests Fail:** Verify application is running before tests execute
- **No Results Generated:** Check JMeter installation and test plan configuration
- **Performance Issues:** Adjust thread count and ramp-up time

## Success Criteria
- ✅ Functional Jira project with team collaboration
- ✅ GitHub repository with complete codebase
- ✅ Jenkins pipeline with all integrations working
- ✅ Automated Jira issue updates
- ✅ Performance testing integrated in pipeline
- ✅ Docker image successfully built and deployed
- ✅ Team members can pull and run Docker image
- ✅ Complete documentation and video recording
