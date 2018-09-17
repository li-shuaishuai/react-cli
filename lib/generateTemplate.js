/**
 * @Author lishuaishuai <lishuaishuai.it@gmail.com>
 * @Date 2018-09-14 09:30:24
 * @Description 渲染数据到模板
 */

const ejs = require('ejs')
const fs = require('fs')
const ora = require('ora')


module.exports = (data) => {
  // let txt = fs.readFileSync('/Users/lishuaishuai/Desktop/test/tt/cc/.download-temp/README.md', 'utf-8')
  // fs.writeFileSync('/Users/lishuaishuai/Desktop/readme.md', ejs.render(txt, data))

  const spinner = ora({ color: 'yellow', text: 'Building projects...' })
  spinner.start()
  return new Promise((resolve, reject) => {
    
  })
}