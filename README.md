<p align="center">
  <img width="200" src="https://raw.githubusercontent.com/li-shuaishuai/react-cli/master/static/logo.png" alt="react-cli"></a>
</p>

<p align="center">
  <a href="https://github.com/li-shuaishuai/react-cli/blob/master/README.md">中文</a> |
  <a href="https://github.com/li-shuaishuai/react-cli/blob/master/README-us.md">English</a>
</p>

<p align="center">
  <a href="https://npmcharts.com/compare/@z2o/react-cli?minimal=true"><img src="https://img.shields.io/npm/dt/@z2o/react-cli.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@z2o/react-cli"><img src="https://img.shields.io/npm/v/@z2o/react-cli.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@z2o/react-cli"><img src="https://img.shields.io/node/v/@z2o/react-cli.svg" alt="Node"></a>
  <a href="https://www.npmjs.com/package/@z2o/react-cli"><img src="https://img.shields.io/npm/l/@z2o/react-cli.svg" alt="License"></a>
</p>

---

# react-cli

一个CLI工具，快速创建基于Webpack的可配置React开发环境

## 安装

```bash
$ npm install -g @z2o/react-cli
```

## 使用

#### 创建一个项目
```bash
$ react init <project-name>
```

#### 生成一个智能组件
```bash
$ react create <component-name> --smart
# 或
$ react create <component-name> -s
```

#### 生成一个木偶组件
```bash
$ react create <component-name> --dumb
# 或
$ react create <component-name> -d
```

例子:

#### 创建项目
```bash
$ react init my-project
$ cd my-project
$ npm start
```

#### 生成智能组件
```bash
$ react create header -s
# 或创建深层智能组件
$ react create header/nav -s
```

#### 生成木偶组件
```bash
$ react create Table -d
# 或创建深层木偶组件
$ react create Table/TableRow -d
```

项目结构:

```bash
.
├── build                   # webpack配置
├── config                  # 公共配置
├── src                     # 开发目录
│   ├── actions             # redux/action
│   ├── assets              # 静态资源，会被webpack编译
│   ├── common              # 公共样式、通用工具
│   ├── components          # UI组件/木偶组件
│   ├── reducers            # redux/reducer
│   ├── store               # redux/store
│   ├── views               # 容器组件/智能组件
│   ├── App.jsx             # 根组件
│   ├── index.js            # 入口文件
│   └── index.tpl.html      # html模板文件
├── static                  # 静态资源，不会被webpack编译
├── .babelrc
├── .gitignore
├── package.json
├── postcss.config.js
└── README.md
```

## 文档

[官网](https://react-cli.lishuaishuai.com/)

## 更新日志

[发行说明](https://github.com/li-shuaishuai/react-cli/releases)中记录了每个版本的详细更改。

## License

[MIT](https://github.com/li-shuaishuai/react-cli/blob/master/LICENSE)