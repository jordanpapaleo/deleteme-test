// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const packageJson = require('../package.json')

try {
  // example file name: acct-shared-0.1.2.tgz
  const filePrefix = packageJson.name + '-'
  const file = fs
    .readdirSync('./')
    .find((fileName) => fileName.startsWith(filePrefix))

  if (file) {
    fs.renameSync(file, 'release/' + file.replace(filePrefix, ''))
  } else {
    console.error('Error: Packaged release file not found')
  }
} catch (err) {
  console.error('Error: Post release failure')
  console.error(err)
  process.exit(1)
}
