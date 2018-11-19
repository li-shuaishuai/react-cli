/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ejs = require('ejs')
const path = require('path')
const ora = require('ora')
const glob = require('glob')
const fs = require('fs-extra')
const rimraf = require('rimraf')

/* 基于模板渲染输出 */
module.exports = (data) => {
  const spinner = ora({ color: 'yellow', text: 'Building projects...' })
  spinner.start()
  return new Promise((resolve, reject) => {
    const _tempPath = path.join(data.projectRoot, data.tempName)
    glob('**', { cwd: _tempPath, dot: true, nodir: true }, (err, files) => {
      if (err) {
        spinner.fail()
        reject(err)
      } else {
        try {
          for (file of files) {
            let txt = fs.readFileSync(path.join(_tempPath, file), 'utf-8')
            fs.outputFileSync(path.join(data.projectRoot, file), ejs.render(txt, data))
          }
          rimraf.sync(_tempPath)
          spinner.succeed('Successful project construction')
          resolve(data)
        } catch (error) {
          reject(error)
          spinner.fail()
        }
      }
    })
  })
}