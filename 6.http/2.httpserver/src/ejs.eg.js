function anonymous(obj) {
    let html = '';
    with (obj) {
        html += `<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        `
        arr.forEach(item => {
            html += `
            <li>${item}</li>
        `
        })
        html += `
    </body>
    </html>`
    }
    return html
}
// 该函数体的内容就是需要拿到的字符串
// console.log(anonymous({arr: [1, 2, 3]}))
// 等价于：
// ==>
let fnStr = `    let html = '';
    with (obj) {
        html += \`<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        \`
        arr.forEach(item => {
            html += \`
            <li>${item}</li>
        \`
        })
        html += \`
    </body>
    </html>\`
    }
    return html`
let fn1 = new Function(fnStr)
fn1({arr: [1, 2, 3]})
// ejs编译思路
// 去掉 <% %> 把需要的内容拼接成字符串
// new Function 执行上面内容
// with语句包裹，展开参数到内部作用域






function renderFile(content, data) {
    let head = `let html = ''\r\n`
    head += 'with(obj){\r\n'
    head += `html+=\``
    content = content.replace(/<%=(.+?)%>/g, function (...args) {
        // data[args[1].trim()]
        return '${' + args[1].trim() + '}'
    })
    content = content.replace(/<%(.+?)%>/g, function (...args) {
        return `\`\r\n${args[1]}\r\n html+=\``
    })
    let footer = `\`
            }
        return html
    `
    let templateStr = head + content + footer
    // console.log(templateStr)
    let fn = new Function('obj', templateStr)
    return fn(data)
}

let content = `
      <html>
      <title><%= title %></title>
        <body>
            <ul>
              <% arr.forEach(function(item){ %> 
                <li><%= item %></li> 
              <% }) %>   
            </ul>  
        </body>
      </html>
    `
const parseHtml = renderFile(content, {arr: [1, 2, 3], title: 'wby'})
// console.log(parseHtml)



