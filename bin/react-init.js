#!/usr/bin/env node
/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const program = require('commander')
const checkPackageVersion = require('../lib/checkPackageVersion')
const generateProjectName = require('../lib/generateProjectName')
const download = require('../lib/download')
const packageName = require('../package.json').name


program.usage('<project-name>').parse(process.argv)

let projectName = program.args[0]
if (!projectName) {
  program.help()
  return
}

checkPackageVersion(packageName, () => {
  main()
})

const generator = require('../lib/generateTemplate')
const installDeps = require('../lib/installDeps')
const welcome = require('../lib/welcome')
const ask = require('../lib/ask')

function main() {
  // 生成项目根目录
  generateProjectName(projectName)
    .then(data => {
      // 询问集成库
      return ask().then(res => {
        return { ...data, ...res }
      })
    }).then(projectInfo => {
      // 下载模板
      return download(projectInfo.name).then(data => {
        return { ...data, ...projectInfo }
      })
    }).then(data => {
      // 渲染模板 输出
      return generator(data).then(data => {
        return data
      })
    }).then((data) => {
      // 安装依赖
      return installDeps(data.projectRoot).then(() => {
        return data
      })
    }).then((data) => {
      return data
    }).then((data) => {
      // 输出引导信息
      welcome(data.projectRoot)
    })
    .catch(err => {
      console.log(err)
    })
}