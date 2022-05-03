const express = require('express') // express module
const app = express() // app
const port = 4000
const bodyParser = require('body-parser')

const config = require('./config/key');

const { User } = require("./models/User");

const mongoose = require('mongoose')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());

mongoose.connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Connected ✅");
    })
    .catch(err => console.log("error = ", err))

app.get('/', (req, res) => { // root directory
    res.send('Hello World! welcome back!')
})

app.post('/register', (req, res)=>{
    // 회원가입 시, 필요한 정보를 client에서 가져오면 DB에 넣어준다.
    
    // req.body 안에는 JSON 형식으로 데이터가 들어옴
    const user = new User(req.body)

    // mongoDB method
    user.save((err, doc) => {
        if(err) return res.json({ success : false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})