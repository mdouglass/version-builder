# mdouglass/version-builder


## NOTES
current versions
20.7.282144+main.1615.83195
yy.m.ddhhmm+branch.build.revision

yy.mdd.hhmm+branch.build.revision
20.801.2144+main.1615.83195

- uses: actions/github-script@v2.0.0
  id: version
  with:
    script: |
      const now = new Date()
      const major = now.getUTCFullYear() - 2000
      const minor = String(now.getUTCMonth() + 1) + String(now.getUTCDate()).padStart(2, '0')
      const patch = now.getUTCHours() + String(now.getUTCMinutes()).padStart(2, '0')
      const ref = context.ref.replace(/^refs\/heads\//, '')
      const run = process.env.GITHUB_RUN_NUMBER
      const sha = context.sha.substr(0,7)
      return `${major}.${minor}.${patch}+${ref}.${run}.${sha}`
    result-encoding:  string


## TODO
Write real unit tests and clean up tests in test.yml
Make tests in test.yml continue on failure