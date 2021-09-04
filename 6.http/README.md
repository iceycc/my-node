## dns 
 dns-prefetch 静态资源配置预解析

## curl请求
  `curl -v -X POST -d "a=1&b=2" http://localhost:3000/sum?name=wby#hash`
```
*   Trying 110.242.68.4:80...
* Connected to www.baidu.com (110.242.68.4) port 80 (#0)
> GET / HTTP/1.1
> Host: www.baidu.com
> User-Agent: curl/7.71.1
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Accept-Ranges: bytes
< Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
< Connection: keep-alive
< Content-Length: 2381
< Content-Type: text/html
< Date: Thu, 12 Aug 2021 23:33:07 GMT
< Etag: "588604c1-94d"
< Last-Modified: Mon, 23 Jan 2017 13:27:29 GMT
< Pragma: no-cache
< Server: bfe/1.0.8.18
< Set-Cookie: BDORZ=27315; max-age=86400; domain=.baidu.com; path=/
< 
<!DOCTYPE html>
<!--STATUS OK--><html> <head><meta http-equiv=content-type content=text/html;charset=utf-8><meta http-equiv=X-UA-Compatible content=IE=Edge><meta content=always name=referrer><link rel=stylesheet type=text/css href=http://s1.bdstatic.com/r/www/cache/bdorz/baidu.min.css><title>百度一下，你就知道</title></head> <body link=#0000cc> <div id=wrapper> <div id=heclass=head_wrapper> <div class=s_form> <div class=s_form_wrapper> <div id=lg> <img hidefocus=true src=//www.baidu.com/img/bd_logo1.png width=270 height=129> </div> <form id=form name=f action=//www.baidu.com/s class=fm> <input type=hidden name=bdorz_come value=1> <input type=hidden name=ie value=utf-8> <input type=hidden name=f value=8> <input type=hidden name=rsv_bp value=1> <input type=hidden name=rsv_idx value=1> <input type=hidden name=tn value=baidu><span class="bg s_ipt_wr"><input id=kw name=wd class=s_ipt value maxlength=255 autocomplete=off autofocus></span><span class="bg s_btn_wr"><input type=submit id=su value=百度一下 class="bg s_btn"></span> </form> </div> </div> <div id=u1> <a href=http://news.baidu.com name=tj_trnews class=mnav>新闻</a> <a href=http://www.hao123.com name=tj_trhao123 class=mnav>hao123</a> <a href=http://map.baidu.com name=tj_trmap class=mnav>地图</a> <ef=http://v.baidu.com name=tj_trvideo class=mnav>视频</a> <a href=http://tieba.baidu.com name=tj_trtieba class=mnav>贴吧</a> <noscript> <a href=http://www.baidu.com/bdorz/login.gigin&amp;tpl=mn&amp;u=http%3A%2F%2Fwww.baidu.com%2f%3fbdorz_come%3d1 name=tj_login class=lb>登录</a> </noscript> <script>document.write('<a href="http://www.baidu.com/bdorz/login.g?login&tpl=mn&u='+ encodeURIComponent(window.location.href+ (window.location.search === "" ? "?" : "&")+ "bdorz_come=1")+ '" name="tj_login" class="lb">登录</a>');</script> <a hre//www.baidu.com/more/ name=tj_briicon class=bri style="display: block;">更多产品</a> </div> </div> </div> <div id=ftCon> <div id=ftConw> <p id=lh> <a href=http://home.baidu.com>关a> <a href=http://ir.baidu.com>About Baidu</a> </p> <p id=cp>&copy;2017&nbsp;Baidu&nbsp;<a href=http://www.baidu.com/duty/>使用百度前必读</a>&nbsp; <a href=http://jianyi.baidu.com=cp-feedback>意见反馈</a>&nbsp;京ICP证030173号&nbsp; <img src=//www.baidu.com/img/gs.gif> </p> </div> </div> </div> </body> </html>
* Connection #0 to host www.baidu.com left intact
```

## 报文
请求：
- 请求头
- 请求行
- 请求体

响应
- 响应头
- 响应体
- 响应体

## 状态码和请求码
浏览器对大多约定对状态码都有默认行为
- 1xx websocket
- 2xx 200成功 204成功没有请求体  206部分请求
- 3xx 301永久重定向 302临时重定向 303临时重定向仅get 304缓存（服务端协商缓存）
- 4xx 400参数错误 401没有登录 403登录了无权限 404没有找到资源 405方法不存在 
- 5xx 500服务端内部错误 501网关错误 503超载

代理 网关 

## 请求方式
- restfull API 根据不同的请求方法来做响应，规范风格; graphQL规范
- get post delete put options patch
- 跨域的时候options预检请求，复杂请求会触发预检请求，询问是否可以请求；自动发送
   - 简单请求：只有默认的get和post，但是在header里加上自定义的字段（如token），就会变成复杂请求
   - 复杂请求：其他
## url uri
- uri唯一资源标识符，名字
- url统一资源定位符，位置

> http://username:password@www.baidu.com:80/index.html?line=9#hash
> 协议 :// 用户权限         @ 域名         :端口/资源?查询参数     #hash(hash仅浏览器有)
   
        


## http2
http2基于https

## http3
quic + udp

## net模块
socket tcp模块


