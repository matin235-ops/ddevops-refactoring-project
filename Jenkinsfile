pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME = 'your-dockerhub-username/devops-refactoring-project'
        JIRA_SITE = 'your-jira-site'
        JIRA_PROJECT_KEY = 'DRP'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                checkout scm
                
                // Update Jira issue
                script {
                    def issueKey = env.CHANGE_BRANCH?.startsWith('feature/') ? 
                        env.CHANGE_BRANCH.split('/')[1] : 'DRP-1'
                    
                    jiraAddComment(
                        site: env.JIRA_SITE,
                        idOrKey: issueKey,
                        comment: "Pipeline started for build #${env.BUILD_NUMBER}"
                    )
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
            post {
                always {
                    // Publish test results
                    publishTestResults testResultsPattern: 'test-results.xml'
                }
            }
        }
        
        stage('Performance Testing') {
            steps {
                script {
                    // Start the application
                    if (isUnix()) {
                        sh 'npm start &'
                        sh 'sleep 10' // Wait for app to start
                    } else {
                        bat 'start /B npm start'
                        bat 'timeout /t 10' // Wait for app to start
                    }
                    
                    // Run JMeter tests
                    script {
                        def jmeterHome = tool name: 'JMeter', type: 'hudson.plugins.jmeter.JMeterInstallation'
                        if (isUnix()) {
                            sh "${jmeterHome}/bin/jmeter.sh -n -t jmeter/performance-test.jmx -l jmeter/results.jtl"
                        } else {
                            bat "${jmeterHome}\\bin\\jmeter.bat -n -t jmeter\\performance-test.jmx -l jmeter\\results.jtl"
                        }
                    }
                }
            }
            post {
                always {
                    // Publish JMeter results
                    publishPerformanceTestResults(
                        sourceDataFiles: 'jmeter/results.jtl',
                        junitOutput: 'jmeter/junit-output',
                        errorFailedThreshold: 5,
                        errorUnstableThreshold: 10
                    )
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}")
                    dockerImage.tag("${env.DOCKER_IMAGE_NAME}:latest")
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        def dockerImage = docker.image("${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}")
                        dockerImage.push()
                        dockerImage.push("latest")
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Deploy using Docker
                    if (isUnix()) {
                        sh "docker run -d --name devops-app-${env.BUILD_NUMBER} -p 8080:3000 ${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
                    } else {
                        bat "docker run -d --name devops-app-${env.BUILD_NUMBER} -p 8080:3000 ${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
                    }
                }
            }
        }
    }
    
    post {
        success {
            script {
                def issueKey = env.CHANGE_BRANCH?.startsWith('feature/') ? 
                    env.CHANGE_BRANCH.split('/')[1] : 'DRP-1'
                
                jiraAddComment(
                    site: env.JIRA_SITE,
                    idOrKey: issueKey,
                    comment: "Pipeline completed successfully for build #${env.BUILD_NUMBER}. Docker image pushed to ${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
                )
                
                // Transition Jira issue to "Done" status
                jiraTransitionIssue(
                    site: env.JIRA_SITE,
                    idOrKey: issueKey,
                    transition: [name: 'Done']
                )
            }
        }
        
        failure {
            script {
                def issueKey = env.CHANGE_BRANCH?.startsWith('feature/') ? 
                    env.CHANGE_BRANCH.split('/')[1] : 'DRP-1'
                
                jiraAddComment(
                    site: env.JIRA_SITE,
                    idOrKey: issueKey,
                    comment: "Pipeline failed for build #${env.BUILD_NUMBER}. Please check the logs."
                )
            }
        }
        
        always {
            // Clean up
            script {
                if (isUnix()) {
                    sh 'pkill -f "npm start" || true'
                    sh "docker stop devops-app-${env.BUILD_NUMBER} || true"
                    sh "docker rm devops-app-${env.BUILD_NUMBER} || true"
                } else {
                    bat 'taskkill /F /IM node.exe || echo "No node processes to kill"'
                    bat "docker stop devops-app-${env.BUILD_NUMBER} || echo \"Container not running\""
                    bat "docker rm devops-app-${env.BUILD_NUMBER} || echo \"Container not found\""
                }
            }
            
            // Archive artifacts
            archiveArtifacts artifacts: 'jmeter/results.jtl, test-results.xml', fingerprint: true
        }
    }
}
