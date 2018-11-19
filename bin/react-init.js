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
        return {
          ...data,
          ...res
        }
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


/* 
  //1. node版本检测
  //0. 检测cli是否需要更新  --更新流程
  //1. 询问下载模板类型 --二期【js、ts】
  //2. 创建项目目录及临时下载目录
  //3. 下载模板文件
  //4. 拷贝文件 =正在构建项目  metalsmith handlebars
  //5. 安装依赖
  //6. 输出欢迎语、引导语、模板更新日志
  7. 选择安装【esLint、redux/mobx、react-router】
  8. new commponent/page
*/
