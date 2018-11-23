[中文](./README.md) | [English](./README-us.md)

---

# react-cli

一个简单的CLI工具，用于生成React项目脚手架

## 安装

```bash
$ npm install -g @ice-point/react-cli
```

## 使用

```bash
$ react init <project-name>
```

例子:

```bash
$ react init my-project
$ cd my-project
$ npm start
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

[Temporary document](https://www.lishuaishuai.com/notice/943.html)

## 更新日志

[发行说明](https://github.com/li-shuaishuai/react-cli/releases)中记录了每个版本的详细更改。

## 保持联系

+ [博客](https://www.lishuaishuai.com)

## License

[MIT](https://github.com/li-shuaishuai/react-cli/blob/master/LICENSE)