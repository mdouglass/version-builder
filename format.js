/* eslint-disable no-unused-vars */
const coreModule = require('@actions/core')
const githubModule = require('@actions/github')

function padZero(value, maxLength = 2) {
  return String(value).padStart(maxLength, '0')
}

function __getPRNumber() {
  const match = /^refs\/pull\/(\d+)\/merge$/.exec(githubModule.context.ref)
  return match ? match[1] : undefined
}

function __buildGithubContext() {
  const github = {
    payload: githubModule.context.payload,
    branch: github.payload.pull_request ? github.payload.pull_request.head.ref : 'unknown',
    commit: {
      sha: github.context.sha,
      shaShort: github.context.sha.substr(0, 7),
    },
    pr: github.payload.pull_request
      ? {
          id: github.payload.pull_request.id,
          number: github.payload.pull_request.number,
          string: `PR-${github.payload.pull_request.number}`,
        }
      : {},
    ref: github.context.ref,
    run: {
      id: githubModule.context.runId,
      number: githubModule.context.runNumber,
    },
  }
}

module.exports.format = function format(formatString) {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth() + 1
  const date = now.getUTCDate()
  const hour = now.getUTCHours()
  const minutes = now.getUTCMinutes()
  const seconds = now.getUTCSeconds()
  const github = __buildGithubContext()
  const env = process.env
  coreModule.debug('github: ' + JSON.stringify(github))
  return eval('`' + formatString.replace('`', '\\`') + '`')
}
