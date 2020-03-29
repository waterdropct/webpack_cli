### 基础框架

1. 已经搭建好 webpack+babel+less+react(可改成Vue)
2. 根据实际情况添加 React/Vue 全家桶
3. 如果需要支持低版本IE，请引入 es3ify-webpack-plugin
4. 配置 build 需要的最低浏览器支持版本，请操作package.json文件的 browserslist 列表
5. static-server 本地静态服务器，可以将build后的文件跑起来
6. 对于新的特性语法，若不支持请安装对应的polyfill，例如 react-app-polyfill

```
yarn

yarn run dev

yarn add npm_package [-D] // 添加package

yarn remove npm_package // 删除package

```