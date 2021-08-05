const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/eShare',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const db = mongoose.connection;
db.on('error', console.error.bind(console,'error in connecting to db'))
db.once('open',function(){
    console.log('successfully connected to db')
})

module.exports = db