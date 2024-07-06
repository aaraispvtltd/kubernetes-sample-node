pipeline {
    agent any
    
    environment {
        registryCredentials = 'docker-credential' // Replace with your actual credentials ID
        dockerImageTag = "aaraispvtltd/sample-node:v1"
        kubeconfig = "kube-config"
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from SCM (Git) directly into the workspace
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    def dockerImage = docker.build(dockerImageTag)
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push Docker image to registry
                    docker.withRegistry('https://index.docker.io/v1/', registryCredentials) {
                        def dockerImage = docker.image(dockerImageTag)
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy Node Application') {
            steps {
                script {
                    withCredentials([file(credentialsId: kubeconfig, variable: 'kube')]) {
                        // Apply Kubernetes deployment
                        sh '''
                        kubectl --kubeconfig=${kube} apply -f ${WORKSPACE}/kubernetes/sample-node-deployment.yaml
                        '''
                    }
                }
            }
        }

        stage('Expose Node Application Service') {
            steps {
                script {
                    withCredentials([file(credentialsId: kubeconfig, variable: 'kube')]) {
                        // Apply Kubernetes service
                        sh '''
                        kubectl --kubeconfig=${kube} apply -f ${WORKSPACE}/kubernetes/sample-node-service.yaml
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline Completed Successfully"
        }
        failure {
            echo 'Pipeline Failed'
        }
    }
}
