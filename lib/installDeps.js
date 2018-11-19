/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { exec } = require('child_process')
const ora = require('ora')

/* 安装依赖 */
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