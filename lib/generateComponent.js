/**
 * Copyright (c) 2018 IcePoint
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path')
const Handlebars = require('handlebars')
const Metalsmith = require('metalsmith')

module.exports = (name, type) => {
  const _templatePath = path.join(__dirname, '../templates/component')
  const metalsmith = Metalsmith(process.cwd())
    .metadata({ componentName: 'abc' })
    .clean(false)
    .source(_templatePath)
    .destination(process.cwd())

  metalsmith.use((files, metalsmith, done) => {
    const meta = metalsmith.metadata()
    console.log(files);

    Object.keys(files).forEach(fileName => {
      const t = files[fileName].contents.toString()
      const n = fileName.replace(/%componentName%/, 'abc')
      delete files[fileName]
      files[n] = { contents: Buffer.from(Handlebars.compile(t)(meta)) }
    })
    done()
  }).build(err => {
    console.log(1, err);

  })
}