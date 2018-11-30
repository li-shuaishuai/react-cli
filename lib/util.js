/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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