const Application = require('./lib/application');
const Router = require("./lib/router");
function createApplication() {
        return new Application()
}
createApplication.Router = Router;
module.exports = createApplication

// 拆分步骤：
// 1 拆分应用
// 2 拆分路由
