/**
 * @Author lishuaishuai
 * @Date 2018-09-19 18:41:58
 * @Description 引导信息
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