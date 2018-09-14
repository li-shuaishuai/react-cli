/**
 * @Author lishuaishuai <lishuaishuai.it@gmail.com>
 * @Date 2018-09-13 21:05:16
 * @Description 拷贝模板文件
 */
const path = require('path')
const ora = require('ora')
const { CONFIG } = require('../config')

module.exports = function () {
  const spinner = ora({ color: 'yellow', text: 'Downloading necessary files...' })
  spinner.start()
}