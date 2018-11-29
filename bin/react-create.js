#!/usr/bin/env node
/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const program = require('commander')

program
  .usage('<component-name> [options]')
  .description('generate a component')
  .option('-d, --dumb [name]', 'dumb components')
  .option('-s, --smart [name]', 'smart components')
  // .action((cmd, options) => {
  //   console.log(options.dumb)
  //   console.log(options.smart)
  // })
  .parse(process.argv)

let componentName = program.args[0]

if (!componentName) {
  program.help()
  return
}

console.log(program.smart)