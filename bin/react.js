#!/usr/bin/env node
/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const program = require('commander')
const renderLogo = require('../lib/logo')
const checkNodeVersion = require('../lib/checkNodeVersion')
const package = require('../package.json')
const { CONFIG } = require('../config')

renderLogo()
checkNodeVersion(package.engines.node, CONFIG.projectName)

program.version(package.version)
  .description(package.description)
  .usage('<command> [project-name]')
  .command('init', 'create new project')


program.command('create', 'generate a component')
  .option('-d, --dumb', 'dumb components')
  .option('-s, --smart', 'smart components')
  .action((cmd, options) => {
    console.log(cmd)
    console.log(options)
  })

program.parse(process.argv)