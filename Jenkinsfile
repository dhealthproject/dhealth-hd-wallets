pipeline {
    agent any
    stages {
        stage('Download dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run linter checks') {
            steps {
                sh 'npm run lint:all'
            }
        }

        stage('Build software') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run unit tests') {
            steps {
                sh 'npm run test'
            }
        }
    }
}
