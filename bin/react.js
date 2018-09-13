#!/usr/bin/env node

const semver = require('semver')
const chalk = require('chalk')
const renderLogo = require('../lib/logo')
const package = require('../package.json')

renderLogo()

/* node版本检测 */
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}
checkNodeVersion(package.engines.node, 'react-cli')

const program = require('commander')

program.version(package.version)
  .description(package.description)
  .usage('<command> [project-name]')
  .command('init', 'create new project')

program.parse(process.argv)