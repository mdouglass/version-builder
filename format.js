/* eslint-disable no-unused-vars */
const coreModule = require('@actions/core')
const githubModule = require('@actions/github')

function padZero(value, maxLength = 2) {
  return String(value).padStart(maxLength, '0')
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
  const env = process.env
  return eval('`' + formatString.replace('`', '\\`') + '`')
}
