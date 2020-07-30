/* eslint-disable no-unused-vars */
const coreModule = require('@actions/core')
const githubModule = require('@actions/github')

function padZero(value, maxLength = 2) {
  return String(value).padStart(maxLength, '0')
}

function __getPRNumber() {
  const match = /refs\/pull\/(\d+)\/merge/.exec(githubModule.context.ref)
  return match ? match.groups[1] : undefined
}

function __getPR() {
  const pr = __getPRNumber()
  return pr ? `PR-${pr}` : undefined
}

module.exports.format = function format(formatString) {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth() + 1
  const date = now.getUTCDate()
  const hour = now.getUTCHours()
  const minutes = now.getUTCMinutes()
  const seconds = now.getUTCSeconds()
  const github = githubModule.context
  const git = {
    prNumber: __getPRNumber(),
    pr: __getPR(),
    branch: 'unknown',
  }
  const env = process.env
  coreModule.debug('git: ' + JSON.stringify(git))
  coreModule.debug('github: ' + JSON.stringify(github))
  return eval('`' + formatString.replace('`', '\\`') + '`')
}
