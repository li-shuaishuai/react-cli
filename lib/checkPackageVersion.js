/**
 * @Author lishuaishuai
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
        spinner.succeed(`Local react-cli is the latest version（${chalk.green(`v${localVersion}`)}）`)
        callback && callback()
      }
    } else {
      spinner.fail()
      console.log(err)
    }
  })
}