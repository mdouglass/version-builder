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
  const pr = githubModule.context.payload.pull_request
  return {
    payload: githubModule.context.payload,
    branch: pr ? pr.head.ref : 'unknown',
    commit: {
      sha: githubModule.context.sha,
      shaShort: githubModule.context.sha.substr(0, 7),
    },
    pr: pr
      ? {
          id: pr.id,
          number: pr.number,
          string: `PR-${pr.number}`,
        }
      : {},
    ref: githubModule.context.ref,
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
