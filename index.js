const express = require('express')
const app = express()
const port = process.env.port || 8000
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const session = require('express-session')
const MongoStore=require('connect-mongo')(session);
const passport = require('passport')
const passportLocal = require('./config/passport-local')
const flash = require('connect-flash')
const middleware = require('./config/middleware')
const csrf = require('csurf')

app.use(express.urlencoded());

app.use(express.static('./assets'))

app.use(expressLayouts)
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.set('view engine','ejs')
app.set('views','./views')

app.use(session({
    name:'interventus',
    secret:'sharath',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*100*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}))

app.use(csrf())

app.use(flash())
app.use(middleware.displayFlash)

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthUser)

app.use("/", require('./routes/index')) 

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is up and running on port ${port}`)
})