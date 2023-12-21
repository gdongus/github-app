pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // Your build steps here
            }
        }
    }
    post {
        always {
            script {
                // Determine build state based on build result
                def state = (currentBuild.result == 'SUCCESS') ? 'SUCCESS' : 'FAILURE'
                def message = (currentBuild.result == 'SUCCESS') ? 'Build succeeded' : 'Build failed'

                // Update GitHub commit status
                step([$class: "GitHubCommitStatusSetter", 
                      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "http://github.com/username/repo"], 
                      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins"], 
                      statusResultSource: [$class: "ConditionalStatusResultSource", 
                                           results: [[$class: "AnyBuildResult", 
                                                      state: state, 
                                                      message: message]]]])
            }
        }
    }
}