/**
 * @Author lishuaishuai
 * @Date 2018-09-19 12:23:24
 * @Description 安装依赖
 */

const { exec } = require('child_process')
const ora = require('ora')

module.exports = (root) => {
  return new Promise((resolve, reject) => {
    const spinner = ora({ color: 'yellow', text: 'Installing project dependencies...' })
    spinner.start()
    exec(`cd ${root} && npm i`, (error, stdout, stderr) => {
      if (error) {
        spinner.fail()
        reject(error)
      } else {
        spinner.succeed('Project dependencies on installation success!')
        resolve(root)
      }
    })
  })
}