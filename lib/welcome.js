/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk')
const { CONFIG } = require('../config')
const log = console.log

module.exports = function (target) {
  log('')
  log(chalk.bold.white('Welcome to use:'))
  log('   Issues: ' + chalk.green(`https://github.com/${CONFIG.authorID}/${CONFIG.projectName}/issues`))
  log('   Update log: ' + chalk.green(`https://github.com/${CONFIG.authorID}/${CONFIG.projectName}`))
  log(chalk.bold.white('We suggest that you begin by typing:'))
  log(`   cd ${target}`)
  log(`   npm start`)
  log('')
}