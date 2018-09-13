const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const ora = require('ora')


program.usage('<project-name>').parse(process.argv)

let projectName = program.args[0]
if (!projectName) {
  program.help()
  return
}

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
    const fileName = path.resolve(process.cwd(), path.join('.', name))
    const isDir = fs.statSync(fileName).isDirectory()
    return name.indexOf(projectName) !== -1 && isDir
  }).length !== 0) {
    spinner.fail(`Project ${projectName} already exists`)
    return
  }
  next = Promise.resolve({ projectRoot: projectName, projectName })
} else if (rootName === projectName) {
  next = inquirer.prompt([
    {
      name: 'buildInCurrent',
      message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
      type: 'confirm',
      default: true
    }
  ]).then(answer => {
    return Promise.resolve({ projectRoot: answer.buildInCurrent ? '.' : projectName, projectName })
  })
} else {
  next = Promise.resolve({ projectRoot: projectName, projectName })
}


next && main()

function main() {
  next.then(projectInfo => {
    console.log(projectInfo)
  })
}


/* 
  0. 检测cli是否需要更新  --更新流程
  1. 询问下载模板类型
  2. 创建项目目录及临时下载目录
  3. 下载模板文件
  4. 拷贝文件
  5. 重命名 ？
  6. 安装依赖
  7. 输出欢迎语、引导语、模板更新日志
*/