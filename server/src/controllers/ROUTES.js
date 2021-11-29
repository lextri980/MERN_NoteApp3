const userRouter = require('./user')
const linkcardRouter = require('./linkcard')
const noteRouter = require('./note')
const profileRouter = require('./profile')

function route(app) {
    app.use('/profile', profileRouter)
    app.use('/note', noteRouter)
    app.use('/linkcard', linkcardRouter)
    app.use('/auth', userRouter)
}

module.exports = route