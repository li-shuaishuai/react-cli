/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { execSync } = require('child_process')
const chalk = require('chalk')
/* 安装依赖 */
module.exports = (root) => {
  return new Promise((resolve, reject) => {
    console.log(`${chalk.green('>')} Install dependencies`)

    try {
      execSync(`cd ${root} && npm i`, { stdio: 'inherit' })
      resolve(root)
    } catch (error) {
      console.log('-------------------------------------------')
      console.log(`${chalk.red('安装依赖出现错误，尝试手动执行')}${chalk.yellow('npm install')}`)
      console.log('-------------------------------------------')
      reject(error)
    }
  })
}