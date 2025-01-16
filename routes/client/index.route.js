const TaskRouter = require("./task.route");
const UserRouter = require("./user.route");
const authenMiddleware = require("../../middleware/client/auth.middleware");
module.exports = (app) => {
    app.use('/task',authenMiddleware.requestAuth,TaskRouter)

    app.use('/user', UserRouter)
}