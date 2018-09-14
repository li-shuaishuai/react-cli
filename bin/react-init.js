#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const ora = require('ora')

const checkPackageVersion = require('../lib/checkPackageVersion')
const next = require('../lib/generateProjectName')
const download = require('../lib/download')
const { CONFIG } = require('../config')



program.usage('<project-name>').parse(process.argv)

let projectName = program.args[0]
if (!projectName) {
  program.help()
  return
}

checkPackageVersion(CONFIG.projectName, () => {
  main()
})


function main() {
  console.log(1111)
  // next.then(projectInfo => {
  //   download(projectInfo.projectName).then((a) => {
  //     console.log(a)
  //   })
  // })
}


/* 
  //1. node版本检测
  0. 检测cli是否需要更新  --更新流程
  //1. 询问下载模板类型 --二期【js、ts】
  //2. 创建项目目录及临时下载目录
  //3. 下载模板文件
  4. 拷贝文件 =正在构建项目  metalsmith handlebars
  5. 安装依赖
  6. 输出欢迎语、引导语、模板更新日志
  7. 选择安装【esLint、redux/mobx、immutable、react-router】
  rimraf:rm -rf
*/