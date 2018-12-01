/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path')
const chalk = require('chalk')

exports.formatFeatures = (features, lead, joiner) => {
  return features.map(dep => {
    return `${lead || ''}${chalk.yellow(dep)}`
  }).join(joiner || ', ')
}

exports.checkComponentName = (name, type) => {
  let _state = false
  switch (type) {
    case 'B': // 大驼峰
      _state = /^[A-Z]+/.test(name)
      !_state && console.log(chalk.red('🐫 Please use UpperCamelCase'))
      break;
    case 'S':// 小驼峰
      _state = /^[a-z]+/.test(name)
      !_state && console.log(chalk.red('🐫 Please use lowerCamelCase'))
      break;
    default:
      _state = false
      !_state && console.log(chalk.red('🐫 Please use CamelCase'))
      break;
  }

  return _state
}

exports.checkLoaderType = root => {
  const packagePath = path.join(root, 'package.json')
  const devDep = require(packagePath).devDependencies
  const devDepArr = Object.keys(devDep).filter((value) => {
    return value === 'sass-loader' || value === 'less-loader' || value === 'stylus-loader'
  })

  if (devDepArr && devDepArr.length > 1) {
    console.log(chalk.red('亲，检测到您的 ') + chalk.cyan('package.json') + chalk.red(' 文件中有多个loader ') + chalk.cyan(`[${devDepArr}]`))
    console.log(chalk.red('你到底用哪个啊，能不能不瞎装！'))
    process.exit(1)
  }

  switch (devDepArr[0]) {
    case 'sass-loader':
      return 'scss'
    case 'less-loader':
      return 'less'
    case 'stylus-loader':
      return 'styl'
    default:
      return ''
  }
}