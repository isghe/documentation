def label = "jenkins-documentation-${UUID.randomUUID().toString()}"

def slack(Map args) {
  slackSend(color: args.color, message: args.message, tokenCredentialId: 'slack-token', channel: 'G8EFQV8VC', baseUrl: 'https://consensys.slack.com/services/hooks/jenkins-ci/')
}

def installDeps() {
  stage("Install deps") {
    container('ci') {
      githubNotify context: 'ci/jenkins: build', status: 'PENDING'
      checkout scm
      try {
        sh 'yarn'
        githubNotify context: 'ci/jenkins: build', status: 'SUCCESS'
      } catch (err) {
        githubNotify context: 'ci/jenkins: build', status: 'ERROR'
        throw err
      }
    }
  }
}

def deploy(target) {
  stage("Deploy ${target}") {
    container('ci') {
      this.slack(color: 'warning', message: ":ship: *Deploy of `infura.io documentation` to ${target} has begun.*\n ${env.RUN_DISPLAY_URL}")
      githubNotify context: "ci/jenkins: deploy-${target}", status: 'PENDING'
      try {
        sh """
          yarn run ${target == 'dev' ? 'bottler-dev' : 'bottler'}
          if [ -f bundle.json ]; then
            aws s3 cp bundle.json s3://infura-docs/bundle.json --acl "public-read"
          fi
          if [ -f bundleDev.json ]; then
            aws s3 cp bundleDev.json s3://infura-docs/bundleDev.json --acl "public-read"
          fi
        """
        githubNotify context: "ci/jenkins: deploy-${target}", status: 'SUCCESS'
        this.slack(color: 'good', message: ":rocketship: *Deploy of `infura.io documentation` to ${target} has succeeded.*\n ${env.RUN_DISPLAY_URL}")
      } catch (err) {
        githubNotify context: "ci/jenkins: deploy-${target}", status: 'ERROR'
        this.slack(color: 'danger', message: ":jenkins_explde: *Deploy of `infura.io documentatino` to ${target} has failed!*\n ${env.RUN_DISPLAY_URL}")
        throw err
      }
    }
  }
}

podTemplate(label: label, podRetention: onFailure(), activeDeadlineSeconds: 600, yaml: """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: ci
      image: 204717343847.dkr.ecr.us-east-1.amazonaws.com/infura/infrastructure-ci-website:latest
      tty: true
      resources:
        requests:
          memory: "4Gi"
          cpu: "2"
        limits:
          memory: "6Gi"
          cpu: "3"
"""
  ) {
  node(label) {
    this.installDeps()

    if ("${env.BRANCH_NAME}" != "master") {
      this.deploy('dev')
    } else {
      stage('Approve prod') {
        input message: 'Deploy to prod?'
      }

      this.deploy('prod')
    }
  }
}