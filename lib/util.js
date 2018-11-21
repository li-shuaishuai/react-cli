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