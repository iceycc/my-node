const fs = require('fs').promises
let ejs = {
    async renderFile(templateUrl, data) {
        let content = await fs.readFile(templateUrl, 'utf8');
        let head = `let html = '';\r\n with(obj){\r\n`;
        head += 'html+=`'
        content = content.replace(/<%=(.+?)%>/g, function () {
            console.log(1, arguments[1])
            return '${' + arguments[1] + '}'
        })
        let body = content.replace(/<%(.+?)%>/g, function () {
            console.log(2, arguments[1])
            return '`\r\n' + arguments[1] + '\r\nhtml+=`';
        })
        let tail = '`}\r\n return html'
        let tempalteStr = head + body + tail;
        // 可以隔离作用域 会创建一个和全局平行的作用域
        let fn = new Function('obj', tempalteStr);
        return fn(data);


        // let content =await fs.readFile(templateUrl,'utf8');
        // return content.replace(/<%=(.+?)%>/g,function () {
        //    return data[arguments[1]]
        // })

        // with + new Function
    }
}
module.exports = ejs


// with可以直接将传入的对象参数展开到内部作用域，
// let obj = {arr: [1, 2, 3], name: 'wby'}
// with (obj) {
//     console.log(arr, name) // [ 1, 2, 3 ] wby
// }

