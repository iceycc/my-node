## 全局 npm i xx -g
- 任何地方使用
- 安装成功会软链到全局
- `/Users/xxx/.nvm/versions/node/v12.13.1/bin/nrm` npm全局目录
- `-> /Users/xxx/.nvm/versions/node/v12.13.1/lib/node_modules/nrm/cli.js` nrm全局安装到位置


例如 nrm，其实就是修改全局到配置文件   /Users/bingyang/.npmrc
```editorconfig
; cli configs
metrics-registry = "https://registry.npm.taobao.org/"
scope = ""
user-agent = "npm/6.12.1 node/v12.13.1 darwin x64"

; userconfig /Users/bingyang/.npmrc
ELECTRON_MIRROR = "http://npm.taobao.org/mirrors/electron/"
registry = "https://registry.npm.taobao.org/"

; node bin location = /Users/bingyang/.nvm/versions/node/v12.13.1/bin/node
; cwd = /Users/bingyang/Documents/festudy/1.rollup/4.node/10.npm/mypackage
; HOME = /Users/bingyang
; "npm config ls -l" to show all defaults.
```
### nrm命令
```shell script
nrm list
nrm use xxx
nrm test
```

## 本地 npm i xxx
本地项目使用
```shell script
npm i webpack --save
npm i webpack --save --dev(-D)
```

`package-lock.json` 锁定版本号

依赖分几种：
- 开发依赖 devDependencies  --dev
- 项目依赖 dependencies
- 同版本依赖 peerDependencies 做警告
- 打包依赖(npm pack)：bundleDependencies 打包到时候node_modules  是否需要打包进去
- 可选依赖 optionalDependencies ，可用可不用。就是安装和不安装的逻辑不一样。。。一般不用

npm run脚本命令
`npm run env`：会将当前文件夹node_modules下的bin目录临时添加到path中

`npx mime 1.js`
如果本地有安装，会直接执行node_modules下bin下的命令；
如果本地没有，会全局临时安装，执行脚本，然后删除。 

npm和yarn不要混用，具体看库或框架的文档

npx是node5.2后自带的

## 版本问题
semver版本规范 major minor patch
- `^2.0.0` : 限制大版本，[2.0,3.0)版本都是可以 
- `~1.2.0` : 限制minor版本，[1.2,1.3)都可以
- `>=1.1.0` 最小版本
- `<=3.0.0` 最大版本
- `1.2.3` :锁定版本


## 初始化npm项目
npm init
```shell script
package name: (mypackage)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: // https://www.ruanyifeng.com/blog/2017/10/open-source-license-tutorial.html
``` 

## npm命令
```shell script
npm config list
npm root -g
npm link # 暂时价格本地链接软链到全局
```

## 自己创建npm包
1. package.json
```json
{
  //  "bin": "./bin/www",
  "bin": {
    "my-npm": "./bin/www"
  }
}
```
2. 给`bin/www`声明执行方式`#！xxx`  
可执行文件`xx/bin/www`:
```js
#! /usr/bin/env node
console.log('ok')
```
3. npm link软链到全局
```
/Users/bingyang/.nvm/versions/node/v12.13.1/bin/mypackage 
-> /Users/bingyang/.nvm/versions/node/v12.13.1/lib/node_modules/mypackage/bin/www

/Users/bingyang/.nvm/versions/node/v12.13.1/lib/node_modules/mypackage
-> /Users/bingyang/Documents/festudy/1.rollup/4.node/10.npm/mypackage
```
4. 发布包：切换npm源，登录，发布
创建 `.npmigonre` 可以忽略文件
```shell script
npm login
npm publish
npm unpublish
```
`unpublish`后25小时内不能重新使用

5. --tag


