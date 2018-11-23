<div align="center">
  [中文](./README.md) | [English](./README-us.md)
</div>

---

# react-cli

A simple CLI for scaffolding React.js projects.

## Install

```bash
$ npm install -g @ice-point/react-cli
```

## Usage

```bash
$ react init <project-name>
```

Example:

```bash
$ react init my-project
$ cd my-project
$ npm start
```

Structure:

```bash
.
├── build                   #Webpack configuration
├── config                  #Public configuration
├── src                     #Development directory
│   ├── actions             #redux/action
│   ├── assets              #Static resources, will be compiled by webpack
│   ├── common              #Public style, common tools
│   ├── components          #UI Components / Dumb Components
│   ├── reducers            #redux/reducer
│   ├── store               #redux/store
│   ├── views               #Container Components / Smart Components
│   ├── App.jsx             #Root component
│   ├── index.js            #Entry file
│   └── index.tpl.html      #Html template file
├── static                  #Static resources, not compiled by webpack
├── .babelrc
├── .gitignore
├── package.json
├── postcss.config.js
└── README.md
```

## Documentation

[Temporary document](https://www.lishuaishuai.com/notice/943.html)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/li-shuaishuai/react-cli/releases).

## Stay In Touch

+ [Blog](https://www.lishuaishuai.com)

## License

[MIT](https://github.com/li-shuaishuai/react-cli/blob/master/LICENSE)