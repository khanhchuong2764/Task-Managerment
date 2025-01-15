const TaskRouter = require("./task.route");
const UserRouter = require("./user.route");
module.exports = (app) => {
    app.use('/task', TaskRouter)

    app.use('/user', UserRouter)
}