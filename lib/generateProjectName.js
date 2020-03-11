/**
 * Copyright (c) 2018 Li Shuaishuai
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const ora = require('ora')

/* 生成项目目录 */
module.exports = (projectName) => {
  // 检查当前环境中是否存在‘node_modules’文件夹
  const isExistsDir = fs.existsSync('node_modules')

  if (isExistsDir) {
    console.log(chalk.red('不能在存在node_modules的目录创建项目！'))
    process.exit(1)
  }


  let next = undefined
  let rootName = path.basename(process.cwd())
  const fileList = glob.sync('*')
  const spinner = ora({ color: 'yellow', text: 'Creating directory...' })

  if (fileList.length) {
    if (fileList.filter(name => {
      const fileName = path.resolve(process.cwd(), name)
      const isDir = fs.statSync(fileName).isDirectory()
      return name === projectName && isDir
    }).length !== 0) {
      spinner.fail(`Project ${projectName} already exists`)
      process.exit(1)
    }
    next = Promise.resolve({ projectRoot: path.resolve(process.cwd(), projectName), name: projectName })
  } else if (rootName === projectName) {
    next = inquirer.prompt([
      {
        name: 'buildInCurrent',
        message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
        type: 'confirm',
        default: true
      }
    ]).then(answer => {
      return Promise.resolve({ projectRoot: path.resolve(process.cwd(), answer.buildInCurrent ? '.' : projectName), projectName })
    })
  } else {
    next = Promise.resolve({ projectRoot: path.resolve(process.cwd(), projectName), name: projectName })
  }
  return next
}