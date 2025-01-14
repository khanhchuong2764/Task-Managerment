const TaskRouter = require("./task.route");

module.exports = (app) => {
    app.use('/task', TaskRouter)
}