const core = require('@actions/core')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const now = new Date()
    const context = {
      year: now.getUTCFullYear(),
      month: now.getUTCMonth() + 1,
      date: now.getUTCDate(),
      sha: 
    }
    let contextProgram = ''
    for (const [key, value] of Object.entries(context)) {
      if (typeof key === 'object' && key !== null) {
        contextProgram += `var ${key} = JSON.parse('${JSON.stringify(value)}');\n`
      } else {
        contextProgram += `var ${key} = ${value};\n`
      }
    }

    const formatString = core.getInput('format').replace('`', '\\`')
    const templateProgram = '`' + formatString + '`'

    const version = eval(contextProgram + templateProgram)
    core.setOutput('version', version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
