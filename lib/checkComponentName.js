/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = (name, type) => {
  let _state = false
  switch (type) {
    case 'dumb': // 大驼峰
      _state = /^[A-Z]+/.test(name)
      break;
    case 'smart':// 小驼峰
      _state = /^[a-z]+/.test(name)
      break;
    default:
      _state = false
      break;
  }

  return _state
}