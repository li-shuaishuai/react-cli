/**
 * @Author lishuaishuai <lishuaishuai.it@gmail.com>
 * @Date 2018-09-14 09:51:23
 * @Description 获取cli版本
 */

const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const ora = require('ora')
const package = require('../package.json')
const { CONFIG } = require('../config')

module.exports = (id, callback) => {
  const spinner = ora({ color: 'yellow', text: 'Detecting update information...' })
  spinner.start()
  request({
    url: CONFIG.npmReg + id,
    timeout: 2000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const localVersion = package.version
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      if (semver.lt(localVersion, latestVersion)) {
        spinner.stop()
        console.log(chalk.yellow('  A newer version of react-cli is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
        console.log(chalk.yellow('  +-------------------------------------------+'))
        console.log(`  ${chalk.yellow('|')}                                           ${chalk.yellow('|')}`)
        console.log(`  ${chalk.yellow('|')}   Run ${chalk.blue(`npm i -g ${package.name}`)} to update   ${chalk.yellow('|')}`)
        console.log(`  ${chalk.yellow('|')}                                           ${chalk.yellow('|')}`)
        console.log(chalk.yellow('  +-------------------------------------------+'))
        console.log()
        process.exit(0)
      } else {
        spinner.succeed('Local react-cli is the latest version！')
        callback && callback()
      }
    }
  })
}