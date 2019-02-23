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

async function main() {
  // 生成项目根目录
  const projectData = await generateProjectName(projectName)
  // 询问集成库
  const askData = await ask()
  // 下载模板
  const downData = await download(projectName)
  // 渲染模板 输出
  const {
    projectRoot
  } = await generator({
    ...projectData,
    ...askData,
    ...downData
  })
  // 安装依赖
  await installDeps(projectRoot)
  // 输出引导信息
  welcome(projectRoot)
}