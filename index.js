const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(bodyParser.json());
const passport = require('passport');
const passportConfig = require('./config/passport');
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => {
    console.log('database connected');
}).catch((error) => {
console.log('database connection failed', error);
});
app.use(passport.initialize());
passportConfig(passport);

const router = require('./router/__index');
app.get('/hello',(req, res) => {
    console.log('hello is working');
    return res.json({
        msg:'hello is working fine'
    })
});




app.use('/', router);
app.listen(process.env.PORT,() => {
    console.log(`server was running on port ${process.env.PORT}`);
})