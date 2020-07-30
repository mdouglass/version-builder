/* eslint-disable no-unused-vars */
const coreModule = require('@actions/core')
const githubModule = require('@actions/core')

module.exports.format = function format(formatString) {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth() + 1
  const date = now.getUTCDate()
  const github = githubModule.context
  const env = process.env
  return eval('`' + formatString.replace('`', '\\`') + '`')
}
