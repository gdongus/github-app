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
                state = (currentBuild.result == 'SUCCESS') ? 'SUCCESS' : 'FAILURE'
                message = (currentBuild.result == 'SUCCESS') ? 'Build succeeded' : 'Build failed'
                repos = ['repo1', 'repo2', 'repo3']
                repos.each { repo ->
                    // Update GitHub commit status
                    step([$class: 'GitHubCommitStatusSetter',
                      reposSource: [$class: 'ManuallyEnteredRepositorySource', url: repo],
                      contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'ci/jenkins'],
                      statusResultSource: [$class: 'ConditionalStatusResultSource',
                                           results: [[$class: 'AnyBuildResult',
                                                      state: state,
                                                      message: message]]]])
                }
            }
        }
    }
}
