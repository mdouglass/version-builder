const core = require('@actions/core')
const { format } = require('./format')

// most @actions toolkit packages have async methods
async function run() {
  try {
    core.setOutput('version', format())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
