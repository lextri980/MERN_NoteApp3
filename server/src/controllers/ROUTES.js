const userRouter = require('./user')
const linkcardRouter = require('./linkcard')

function route(app) {
    app.use('/linkcard', linkcardRouter)
    app.use('/auth', userRouter)
}

module.exports = route