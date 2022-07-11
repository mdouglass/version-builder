const core = require('@actions/core')
const { format } = require('./format')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const input = core.getInput('format')
    const output = format(input)
    core.info(`${input} => ${output}`)
    core.setOutput('version', output)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
