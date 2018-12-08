<p align="center">
  <img width="200" src="https://raw.githubusercontent.com/li-shuaishuai/react-cli/master/static/logo.png" alt="react-cli"></a>
</p>

<p align="center">
  <a href="https://github.com/li-shuaishuai/react-cli/blob/master/README.md">中文</a> |
  <a href="https://github.com/li-shuaishuai/react-cli/blob/master/README-us.md">English</a>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/@ice-point/react-cli?minimal=true"><img src="https://img.shields.io/npm/dm/@ice-point/react-cli.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@ice-point/react-cli"><img src="https://img.shields.io/npm/v/@ice-point/react-cli.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@ice-point/react-cli"><img src="https://img.shields.io/node/v/@ice-point/react-cli.svg" alt="Node"></a>
  <a href="https://www.npmjs.com/package/@ice-point/react-cli"><img src="https://img.shields.io/npm/l/@ice-point/react-cli.svg" alt="License"></a>
</p>

---

# react-cli

A simple CLI for scaffolding React.js projects.

## Install

```bash
$ npm install -g @ice-point/react-cli
```

## Usage

#### create new project
```bash
$ react init <project-name>
```

#### generate a smart component
```bash
$ react create <component-name> --smart
# or
$ react create <component-name> -s
```

#### generate a dumb component
```bash
$ react create <component-name> --dumb
# or
$ react create <component-name> -d
```

Example:

### create new project
```bash
$ react init my-project
$ cd my-project
$ npm start
```
Then open http://localhost:3000/ to see your app.

### generate a smart component
```bash
$ react create header -s
# Or create a deep smart component
$ react create header/nav -s
```

### generate a dumb component
```bash
$ react create Table -d
# Or create a deep dumb component
$ react create Table/TableRow -d
```

Structure:

```bash
.
├── build                   # Webpack configuration
├── config                  # Public configuration
├── src                     # Development directory
│   ├── actions             # redux/action
│   ├── assets              # Static resources, will be compiled by webpack
│   ├── common              # Public style, common tools
│   ├── components          # UI Components / Dumb Components
│   ├── reducers            # redux/reducer
│   ├── store               # redux/store
│   ├── views               # Container Components / Smart Components
│   ├── App.jsx             # Root component
│   ├── index.js            # Entry file
│   └── index.tpl.html      # Html template file
├── static                  # Static resources, not compiled by webpack
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