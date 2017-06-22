node {
    docker.withRegistry('https://registry.hub.docker.com', 'docker-registry-login') {
        stage('Checkout') {
            checkout scm
        }
        def myDocker = docker.image("scomm/node-build:latest")
        myDocker.pull()
        myDocker.inside("-v ${env.WORKSPACE}:/var/www/html -u 0:0") {

            stage('NPM') {
                sh 'npm install'
            }
            stage ('Bower') {
                sh 'bower install --allow-root'
            }
            stage('Ember') {
                sh 'ember build --environment=production'
            }

        }

    }

    stage("Copy Artifacts") {
        if (!env.BRANCH_NAME.contains('PR-')) {
            step([$class: 'ArtifactArchiver', artifacts: 'Dockerfile'])
            step([$class: 'ArtifactArchiver', artifacts: 'httpd.conf'])
            step([$class: 'ArtifactArchiver', artifacts: 'dist/**'])
        }
    }
}
