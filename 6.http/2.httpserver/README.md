## 初始化项目
1. npm init
2.  创建www执行文件，其实加上后缀也可以，不过一般都是没文件后缀的
    ```shell script
    cat > bin/www << EOF
    > #! /usr/bin/env node
    > console.log('ok')
    > EOF
    ```
3. package.json `"bin":"/bin/www""`    
4. `npm link`
5. `i-httpserver`

## 需要的工具
www
```js
const program = require('commander');
const chalk = require('chalk');
```

## server
- start启动
- 静态服务器实现思路：
    - 收到请求是根据请求url，拼接path，然后判断对应的是文件还是文件夹
    - 文件夹：readdir读取文件列表，返回一个列表html，可以结合ejs模版引擎
    - 文件：判断文件内容，设置ContentType，然后createReadStream读文件，然后pipe出去;
    - 注意404，
    
## ejs模版引擎实现思路
- 正则替换 `<% %>` `<%=%>` ，把需要的内容拼接成字符串
- 用with包括植入参数 + new Function包括执行

## 缓存
服务端主要功能是告诉浏览器要不要使用缓存
强制缓存：
- Cache-Control 
- Expires
协商缓存
- Last-Modify  ---> If-Modify-Size
- Etag  ---> if-none-match

强制缓存和协商缓存如何搭配，缓存策略：
- 第一次请求返回资源，服务器会设置 `Catch-Control：max-age:5` 和 `Expires: xxx` 响应头，告诉浏览器5秒别来找我；
- 同时设置Last-Modify和Etag文件表示
- 5秒内浏览器会直接走浏览器自己的缓存；
- 5s后请求服务器，服务器会先判断文件携带的 `if-modify-size`，不一样返回新资源；一样的话再判断 `if none cache`。如果文件没改变，返回304
- 浏览器收到304直接取缓存资源

不同文件策略：
- 比如区分图片、js、css或者区分是否经常改变去设置不同的缓存策略
## 压缩
