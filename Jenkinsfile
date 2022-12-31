pipeline {
    agent { 
        docker { 
            image 'node:18.12.1-alpine'
            args '-p 2376:2376'
        } 
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                input message: 'Installing dependencies...'
                sh 'npm ci'
                input message: 'Installing dependencies complete.'
                input message: 'Building...'
                sh 'npm run build'
                input message: 'Building complete.'
            }
        }
        stage('Lint') {
            steps {
                input message: 'Linting...'
                sh 'npm run lint'
                input message: 'Linting complete'
            }
        }
        stage('Test') {
            steps {
                input message: 'Testing...'
                sh 'npm run coverage'
                input message: 'Testing complete'
            }
        }
    }
}