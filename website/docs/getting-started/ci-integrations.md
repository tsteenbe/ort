# CI Integrations

## Running on CI

A basic ORT pipeline (using the *analyzer*, *scanner* and *reporter*) can easily be run on [Jenkins CI](https://jenkins.io/) by using the
[Jenkinsfile](https://github.com/oss-review-toolkit/ort/blob/main/integrations/jenkins/Jenkinsfile) in a (declarative) [pipeline](https://jenkins.io/doc/book/pipeline/) job.
Please see the [Jenkinsfile](https://github.com/oss-review-toolkit/ort/blob/main/integrations/jenkins/Jenkinsfile) itself for documentation of the required Jenkins plugins.
The job accepts various parameters that are translated to ORT command line arguments.
Additionally, one can trigger a downstream job which e.g. further processes scan results.
Note that it is the downstream job's responsibility to copy any artifacts it needs from the upstream job.


## Forgejo action for ORT

A [Forgejo Action](https://github.com/oss-review-toolkit/ort-ci-github-action) to run ORT.

## GitHub action for ORT

A [GitHub Action](https://github.com/oss-review-toolkit/ort-ci-github-action) to run ORT.

## GitLab job template for ORT

A [GitLab job template](https://github.com/oss-review-toolkit/ort-ci-gitlab) to run ORT.

## ORT config repository

A [repository](https://github.com/oss-review-toolkit/ort-config) with exemplary ORT configuration files.
