const express = require('./express')
const app = express()
// curl -v -X GET http://localhost:3000/user/wby/123/get
app.get('/user/:name/:id/get', function (req, res) {
    console.log(req.params)
})
app.listen(3000, () => console.log(`start in \r\nhttp://localhost:3000 \r\nhttp://a.test.com:3000 \r\nhttp://b.test.com:3000`))




