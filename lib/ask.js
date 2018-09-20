/**
 * @Author lishuaishuai
 * @Date 2018-09-19 17:47:43
 * @Description 询问
 */
const inquirer = require('inquirer')


module.exports = () => {
  inquirer.prompt([
    {
      name: 'router',
      message: 'Whether to use react-router？',
      type: 'confirm',
      default: true
    }
  ]).then(answer => {
    console.log(answer)
  })
}