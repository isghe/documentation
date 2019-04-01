def label = "jenkins-documentation-${UUID.randomUUID().toString()}"
def scmVars = {};

def slack(Map args) {
  slackSend(color: args.color, message: args.message, tokenCredentialId: 'slack-token', channel: 'G8EFQV8VC', baseUrl: 'https://consensys.slack.com/services/hooks/jenkins-ci/')
}

def build() {
  stage("Build") {
    container('ci') {
      githubNotify context: 'ci/jenkins: build', status: 'PENDING'
      try {
        sh """
          yarn
          yarn run bottler
        """
        githubNotify context: 'ci/jenkins: build', status: 'SUCCESS'
      } catch (err) {
        githubNotify context: 'ci/jenkins: build', status: 'ERROR'
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
      image: node:latest
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
    this.build()

    // if ("${env.BRANCH_NAME}" != "master") {
    //   this.deploy('dev')
    // } else {
    //   this.deploy('staging')

    //   stage('Approve prod') {
    //     input message: 'Deploy to prod?'
    //   }

    //   this.deploy('prod')
    // }
  }
}