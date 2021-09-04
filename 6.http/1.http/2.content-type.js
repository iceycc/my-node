
const http = require('http');
const url = require('url');
const querystring = require("querystring");
const server = http.createServer((req, res) => {
    if (req.url === '/login') {
        let arr = []
        req.on('data', (chunk) => {
            arr.push(chunk)
        })
        req.on('end', () => {
            const contentType = req.headers['content-type']
            const content = Buffer.concat(arr).toString()
            console.log(contentType, '\n\r')
            console.log(content)
            let result;
            // postman请求 body的不同类型
            // application/json ( raw) 传递{"username":"wby","password":"123456"}  ->:
            /**
             application/json

             {"username":"wby","password":"123456"}
             */
            if (contentType === 'application/json') {
                result = JSON.parse(content)
            }
            //  x-www-form-urlencoded ->:
            if (contentType === 'application/x-www-form-urlencoded') {
                /**
                 application/x-www-form-urlencoded

                 password=123456&username=wby
                 */
                result = querystring.parse(content + '');
            }
            // 3 form-data ->:
            /**
             multipart/form-data; boundary=--------------------------468914301070361000928094

             ----------------------------468914301070361000928094
             Content-Disposition: form-data; name="password"

             123456
             ----------------------------468914301070361000928094
             Content-Disposition: form-data; name="username"

             wby
             ----------------------------468914301070361000928094--
             **/
            console.log(result)
            res.end(JSON.stringify(result))
        })
    }
})

server.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))

