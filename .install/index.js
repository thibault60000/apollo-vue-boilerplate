const fs = require('fs')
const {
  replaceInFiles,
  deploy,
  writeEnv,
  getInfo,
  makeSandboxEndpoint,
} = require('graphql-boilerplate-install')

module.exports = async ({ project, projectDir }) => {
  const templateName = 'graphql-boilerplate'

  const endpoint = await makeSandboxEndpoint(project)

  process.chdir('server/')
  replaceInFiles(
    ['src/index.js', 'package.json', 'database/prisma.yml'],
    templateName,
    project,
  )
  replaceInFiles(['.env'], '__PRISMA_ENDPOINT__', endpoint)

  console.log('Running $ prisma deploy...')
  await deploy(false)
  process.chdir('../')

  fs.appendFileSync('server/.gitignore', '.env*\n')
}
