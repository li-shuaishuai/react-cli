/**
 * Copyright (c) 2018 Li Shuaishuai
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const ora = require('ora')
const package = require('../package.json')
const { CONFIG } = require('../config')
const log = console.log

/* 获取当前包的版本 */
module.exports = (id, callback) => {
  const spinner = ora({ color: 'yellow', text: 'Getting update information...' })
  spinner.start()
  request({
    url: CONFIG.npmReg + id,
  }, (err, res, body) => {
    const localVersion = package.version
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      if (semver.lt(localVersion, latestVersion)) {
        spinner.stop()
        log(chalk.yellow('  A newer version of react-cli is available.'))
        log()
        log('  latest:    ' + chalk.green(latestVersion))
        log('  installed: ' + chalk.red(localVersion))
        log()
        log(chalk.yellow('  +-------------------------------------------------+'))
        log(`  ${chalk.yellow('|')}                                                 ${chalk.yellow('|')}`)
        log(`  ${chalk.yellow('|')}   Run ${chalk.blue(`npm i -g ${package.name}`)} to update   ${chalk.yellow('|')}`)
        log(`  ${chalk.yellow('|')}                                                 ${chalk.yellow('|')}`)
        log(chalk.yellow('  +-------------------------------------------------+'))
        log()
        process.exit(0)
      } else {
        spinner.succeed(`Local react-cli is the latest version（${chalk.green(`v${localVersion}`)}）`)
        callback && callback()
      }
    } else {
      spinner.fail()
      log(err)
    }
  })
}