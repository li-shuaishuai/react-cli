/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const inquirer = require('inquirer')
const { formatFeatures } = require('./util')
const defaultChoices = ['React-router', 'Redux', 'Scss']

module.exports = async () => {
  let next = undefined
  const _data = {}

  /* default or select */
  const presetPrompt = [{
    type: 'list',
    message: 'Please pick a preset:',
    name: 'preset',
    choices: [
      {
        name: `default (${formatFeatures(defaultChoices)})`,
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
    // default value
    return Promise.resolve({
      router: true,
      redux: true,
      scss: true,
      mobile: false
    })
  }

  /* choose platform */
  const platformPrompt = [{
    type: 'list',
    message: 'Please select the application platform:',
    name: 'platform',
    choices: [
      { name: 'PC', value: 0 },
      { name: 'Mobile', value: 1 }
    ]
  }]
  const { platform } = await inquirer.prompt(platformPrompt)
  _data.mobile = !!platform


  /* check */
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
      },
      {
        name: "CSS Pre-processors",
        value: 'cssPre',
        checked: true
      }
    ]
  }]
  const { features } = await inquirer.prompt(featuresPrompt)

  features.forEach((currentValue) => {
    _data[currentValue] = true
  })

  if (!_data.cssPre) {
    next = Promise.resolve(_data)
    return next
  }

  /* CSS Pre-processors */
  const cssPrePrompt = [{
    type: 'list',
    message: 'Pick a CSS pre-propcessor (PostCSS, Autoprefixer and CSS Modules are supported by default):',
    name: 'cssPre',
    choices: [
      { name: 'Sacc/SCSS', value: 'scss' },
      { name: 'Less', value: 'less' },
      { name: 'Stylus', value: 'stylus' }
    ]
  }]
  const { cssPre } = await inquirer.prompt(cssPrePrompt)

  _data[cssPre] = true
  next = Promise.resolve(_data)

  return next
}