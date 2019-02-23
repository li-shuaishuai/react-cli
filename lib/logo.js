/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk')
const version = require('../package.json').version
const log = console.log

module.exports = function () {
  log('-----------------------------------------------------------')
  log(chalk.blue('    ____                 _      ____ _     ___'))
  log(chalk.blue('   |  _ \\ ___  __ _  ___| |_   / ___| |   |_ _|'))
  log(chalk.blue('   | |_) / _ \\/ _` |/ __| __| | |   | |    | |'))
  log(chalk.blue('   |  _ <  __/ (_| | (__| |_  | |___| |___ | |'))
  log(chalk.blue('   |_| \\_\\___|\\__,_|\\___|\\__|  \\____|_____|___|   ' + chalk.cyan(`v${version}`)))
  log('-----------------------------------------------------------')
  log(chalk.cyan('                react-cli.lishuaishuai.com'))
  log('-----------------------------------------------------------')
}