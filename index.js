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
      ...github.context,
    }
    core.debug('context: ' + JSON.stringify(context))

    let contextProgram = ''
    for (const [key, value] of Object.entries(context)) {
      if (typeof value === 'object' && value !== null) {
        contextProgram += `var ${key} = JSON.parse('${JSON.stringify(value)}');\n`
      } else {
        contextProgram += `var ${key} = ${value};\n`
      }
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
