#!/usr/bin/env node

const renderLogo = require('../lib/logo')
const package = require('../package.json')
const checkNodeVersion = require('../lib/checkNodeVersion')
const { CONFIG } = require('../config')

renderLogo()
checkNodeVersion(package.engines.node, CONFIG.projectName)

const program = require('commander')

program.version(package.version)
  .description(package.description)
  .usage('<command> [project-name]')
  .command('init', 'create new project')

program.parse(process.argv)