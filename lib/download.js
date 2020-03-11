/**
 * Copyright (c) 2018 Li Shuaishuai
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const download = require('download-git-repo')
const path = require('path')
const ora = require('ora')
const { CONFIG } = require('../config')
const TEMP = '.download-temp'

/* 下载模板 */
module.exports = (target) => {
  target = path.join(target || '.', TEMP)
  const spinner = ora({ color: 'yellow', text: 'Downloading template file...' })
  spinner.start()
  return new Promise((resolve, reject) => {
    download(`${CONFIG.authorID}/${CONFIG.templateName}#${CONFIG.branch}`, target, (err) => {
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