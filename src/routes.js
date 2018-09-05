const url = require('./config').url
const User = require('./controllers/user.controller')

module.exports = {
    
    middleware: {
        
        responses: app => {

            app.use((req, res, next) => {

                res.nope = (msg, status = 400) => res.json({ err: msg, status })                        
                res.yep = data => res.json({ status: 200, data })

                next()
            })
        }
    },
    init: function(app){
        
        // apply middleware
        this.middleware.responses(app)

        // attach routes
        app.route('/users')        
            .post(User.createUser)
            .get(User.getUsers)

        app.route('/users/:userId')
            .get(User.getUser)
            .put((req, res) => console.log('put'))
            .delete((req, res) => console.log('delete'))
    }
}