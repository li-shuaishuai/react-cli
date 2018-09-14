/**
 * @Author lishuaishuai <lishuaishuai.it@gmail.com>
 * @Date 2018-09-14 11:22:05
 * @Description node版本检测
 */
const semver = require('semver')
const chalk = require('chalk')

module.exports = (wanted, id) => {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}