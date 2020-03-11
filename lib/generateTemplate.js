/**
 * Copyright (c) 2018 Li Shuaishuai
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path')
const Handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const ora = require('ora')
const fs = require('fs-extra')
const rm = require('rimraf').sync

/* 基于模板渲染输出 */
module.exports = (data) => {
  const spinner = ora({ color: 'yellow', text: 'Building projects...' })
  spinner.start()
  return new Promise((resolve, reject) => {
    const _tempPath = path.join(data.projectRoot, data.tempName)
    const metalsmith = Metalsmith(process.cwd())
      .metadata(data)
      .clean(false)
      .source(_tempPath)
      .destination(data.projectRoot)

    // 判断下载的项目模板中是否有templates.ignore
    const ignoreFile = path.join(_tempPath, 'templates.ignore')
    if (fs.existsSync(ignoreFile)) {
      // 定义一个用于移除模板中被忽略文件的metalsmith插件
      metalsmith.use((files, metalsmith, done) => {
        const meta = metalsmith.metadata()
        // 先对ignore文件进行渲染，然后按行切割ignore文件的内容，拿到被忽略清单
        const ignores = Handlebars.compile(fs.readFileSync(ignoreFile).toString())(meta)
          .split('\n').filter(item => !!item.length)

        Object.keys(files).forEach(fileName => {
          // 移除被忽略的文件及文件夹
          ignores.forEach(ignorePattern => {
            if (fileName.indexOf(ignorePattern) >= 0) {
              delete files[fileName]
            }
          })
        })
        done()
      })
    }
    metalsmith.use((files, metalsmith, done) => {
      const meta = metalsmith.metadata()
      Object.keys(files).forEach(fileName => {
        // 过滤掉图片
        if(!(/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(fileName))) {
          const t = files[fileName].contents.toString()
          files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
        }
      })
      done()
    }).build(err => {
      rm(_tempPath)
      if (err) {
        spinner.fail()
        reject(err)
      } else {
        spinner.succeed('Successful project construction')
        resolve(data)
      }
    })
  })
}