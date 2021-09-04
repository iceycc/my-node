const url = require('url');
// request文件只是为了对req进行拓展的
let request = {
    get path(){ // 等价于Object.defineProperty()
        // 此处this，谁调用指向谁。
        return url.parse(this.req.url).pathname
    },
    get url(){ // 等价于Object.defineProperty()
        // 此处this，谁调用指向谁。
        return url.parse(this.req.url).pathname
    }
}
module.exports = request;
