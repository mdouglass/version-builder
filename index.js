const core = require('@actions/core')
const github = require('@actions/github')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const now = new Date()
    const context = {
      year: now.getUTCFullYear(),
      month: now.getUTCMonth() + 1,
      date: now.getUTCDate(),
      github: github.context,
      env: process.env,
    }
    core.debug('context: ' + JSON.stringify(context))

    let contextProgram = ''
    for (const [key, value] of Object.entries(context)) {
      contextProgram += `var ${key} = JSON.parse('${JSON.stringify(value)}');\n`
    }
    core.debug('contextProgram: ' + contextProgram)

    const formatString = core.getInput('format').replace('`', '\\`')
    const templateProgram = '`' + formatString + '`'
    core.debug('templateProgram: ' + templateProgram)

    const version = eval(contextProgram + templateProgram)
    core.debug('version: ' + version)

    core.setOutput('version', version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
