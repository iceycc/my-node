const Application = require('./lib/application');
function createApplication() {
        return new Application()
}
module.exports = createApplication

// 拆分步骤：
// 1 拆分应用
// 2 拆分路由
