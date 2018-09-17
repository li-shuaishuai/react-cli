/**
 * @Author lishuaishuai <lishuaishuai.it@gmail.com>
 * @Date 2018-09-13 20:14:37
 * @Description 下载模板文件
 */

const download = require('download-git-repo')
const path = require('path')
const ora = require('ora')
const { CONFIG } = require('../config')
const TEMP = '.download-temp'

module.exports = (target) => {
  target = path.join(target || '.', TEMP)
  const spinner = ora({ color: 'yellow', text: 'Downloading template file...' })
  spinner.start()
  return new Promise((resolve, reject) => {
    const repository = path.join(CONFIG.authorID, CONFIG.templateName)
    download(repository, target, { clone: true }, (err) => {
      if (err) {
        spinner.fail()
        reject(err)
      } else {
        spinner.succeed('Template file is downloaded successfully')
        resolve({ tempName: TEMP })
      }
    })
  })
}