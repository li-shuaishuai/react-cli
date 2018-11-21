/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const inquirer = require('inquirer')
const { formatFeatures } = require('./util')

module.exports = async () => {
  const presetPrompt = [{
    type: 'list',
    message: 'Please pick a preset:',
    name: 'preset',
    choices: [
      {
        name: `default (${formatFeatures(['react-router', 'redux'])})`,
        value: 0
      },
      {
        name: 'Manually select features',
        value: 1
      }
    ]
  }]
  const { preset } = await inquirer.prompt(presetPrompt)
  if (!preset) {
    return {
      router: true,
      redux: true
    }
  } else {
    const featuresPrompt = [{
      type: "checkbox",
      message: "Check the features needed for your project:",
      name: "features",
      choices: [
        {
          name: "react-router",
          value: 'router'
        },
        {
          name: "redux",
          value: 'redux'
        }
      ]
    }]
    const { features } = await inquirer.prompt(featuresPrompt)

    const _data = {}
    features.forEach((currentValue) => {
      _data[currentValue] = true
    })
    
    return _data
  }
}