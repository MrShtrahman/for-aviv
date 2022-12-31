pipeline {
    agent { docker { image 'node:18.12.1-alpine' } }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                input messgae: 'Installing dependencies...'
                sh 'npm ci'
                input messgae: 'Installing dependencies complete.'
                input messgae: 'Building...'
                sh 'npm run build'
                input messgae: 'Building complete.'
            }
        }
        stage('Lint') {
            steps {
                input messgae: 'Linting...'
                sh 'npm run lint'
                input messgae: 'Linting complete'
            }
        }
        stage('Test') {
            steps {
                input messgae: 'Testing...'
                sh 'npm run coverage'
                input messgae: 'Testing complete'
            }
        }
    }
}