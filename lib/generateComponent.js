/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const chalk = require('chalk')
const { CONFIG } = require('../config/index')

module.exports = (name, type) => {
  const _templatePath = path.join(__dirname, '../templates/component')
  const _srcPath = path.join(process.cwd(), CONFIG.sourceBase)

  return new Promise((resolve, reject) => {
    let hsPath = undefined

    try {
      hsPath = fs.statSync(_srcPath)
    } catch (error) { }
    if (!hsPath || !hsPath.isDirectory()) {
      reject('Please run the command in the project root directory')
    }

    const _componentDir = type === 'smart' ? CONFIG.smartPath : CONFIG.dumbPath
    const _targetPath = path.join(_srcPath, _componentDir, name)
    // 检测组件是否存在
    try {
      fs.statSync(_targetPath)
      reject('Component already exists')
    } catch (error) { }

    const pathArr = []
    const metalsmith = Metalsmith(process.cwd())
      .metadata({ componentName: name })
      .clean(false)
      .source(_templatePath)
      .destination(_targetPath)

    metalsmith.use((files, metalsmith, done) => {
      const meta = metalsmith.metadata()

      Object.keys(files).forEach(fileName => {
        const t = files[fileName].contents.toString()
        const n = fileName.replace(/%componentName%/, name)
        delete files[fileName]
        files[n] = { contents: Buffer.from(Handlebars.compile(t)(meta)) }
        pathArr.push(path.join(CONFIG.sourceBase, _componentDir, name, n))
      })

      done()
    }).build(err => {
      if (err) {
        reject(err)
      } else {
        resolve(pathArr)
      }
    })
  })
}