#!/usr/bin/env node
/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const program = require('commander')

program
  .usage('<component-name> [options]')
  .description('generate a component')
  .option('-d, --dumb', 'dumb components')
  .option('-s, --smart', 'smart components')
  .parse(process.argv)

let componentName = program.args[0]
const { smart, dumb } = program

if (!componentName || !(smart || dumb) || (smart && dumb)) {
  program.help()
  return
}

const { checkComponentName } = require('../lib/util')
const generateComponent = require('../lib/generateComponent')

const isHump = checkComponentName(componentName, smart ? 'S' : 'B')

if (!isHump) {
  process.exit(1)
}

generateComponent()

// 1. 检验小驼峰 大驼峰 特殊字符
// 2. 模板文件
// 3. 输出路径
// 4. 渲染模板
// 5. 输出成功/错误提示