/**
 * @Author lishuaishuai
 * @Date 2018-09-19 17:47:43
 * @Description 询问
 */
const inquirer = require('inquirer')


module.exports = () => {
  return inquirer.prompt([
    {
      name: 'router',
      message: 'Whether to use react-router?',
      type: 'confirm',
      default: true
    },
    {
      name: 'state',
      message: 'Whether to use Redux or Mobx?',
      type: 'confirm',
      default: true
    }
  ]).then(answer => {
    const { state } = answer
    const _promptList = [{
      name: 'ESLint',
      message: 'Whether to use ESLint',
      type: 'confirm',
      default: true
    }]
    if (state) {
      const _stateType = {
        name: 'stateType',
        message: 'Please choose Redux or Mobx',
        type: 'list',
        choices: [
          "redux",
          "mobx"
        ]
      }
      _promptList.unshift(_stateType)
    }
    return inquirer.prompt(_promptList).then(data => {
      return {
        ...answer,
        ...data
      }
    })
  })
}