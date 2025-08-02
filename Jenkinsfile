pipeline {
    agent any

    environment {
        CYPRESS_SPEC = "cypress/e2e/NaukriProfileUpdate.cy.js"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'echo Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Verify Cypress') {
            steps {
                bat 'node -v'
                bat 'npx cypress --version'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat "npx cypress run --spec \"%CYPRESS_SPEC%\""
            }
        }
    }

    post {
        success {
            echo '✅ Cypress tests passed!'
        }

        failure {
            echo '❌ Cypress tests failed!'
        }
    }
}
