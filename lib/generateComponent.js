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
const { CONFIG } = require('../config/index')
const { checkLoaderType } = require('../lib/util')

module.exports = (name, type) => {
  const _templatePath = path.join(__dirname, '../templates/component')
  const _srcPath = path.join(process.cwd(), CONFIG.sourceBase)

  return new Promise((resolve, reject) => {
    // 检测目录结构是否符合规范 命令执行是否在根目录
    let hsPath = undefined
    try {
      hsPath = fs.statSync(_srcPath)
    } catch (error) { }
    if (!hsPath || !hsPath.isDirectory()) {
      reject('Please run the command in the project root directory')
    }

    // 检测组件是否存在
    const _componentDir = type === 'smart' ? CONFIG.smartPath : CONFIG.dumbPath
    const _targetPath = path.join(_srcPath, _componentDir, name)
    try {
      fs.statSync(_targetPath)
      reject('Component already exists')
    } catch (error) { }

    // 检测css预处理语言类型
    const cssPre = checkLoaderType(process.cwd())
    if (!cssPre) {
      reject('异常：检测到package.json中未安装css预处理语言loader')
    }

    // 渲染
    const pathArr = []
    const metalsmith = Metalsmith(process.cwd())
      .metadata({
        componentName: name.slice(0, 1).toLowerCase() + name.slice(1),
        componentNameUP: name.slice(0, 1).toUpperCase() + name.slice(1),
        cssPre,
        [cssPre]: true
      })
      .clean(false)
      .source(_templatePath)
      .destination(_targetPath)

    metalsmith.use((files, metalsmith, done) => {
      const meta = metalsmith.metadata()
console.log(meta);

      Object.keys(files).forEach(fileName => {
        const t = files[fileName].contents.toString()
        const n = Handlebars.compile(fileName)(meta)
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