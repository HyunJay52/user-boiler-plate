const express = require('express') // express module
const app = express() // app
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key');

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

const mongoose = require('mongoose');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
// cookie parser
app.use(cookieParser());

mongoose.connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Connected ✅");
    })
    .catch(err => console.log("error = ", err))

// root
app.get('/', (req, res) => { // root directory
    res.send('Hello World! welcome back!')
})

// register router
app.post('/api/users/register', (req, res)=>{
    // 회원가입 시, 필요한 정보를 client에서 가져오면 DB에 넣어준다.
    
    // req.body 안에는 JSON 형식으로 데이터가 들어옴
    const user = new User(req.body)

    // mongoDB method
    user.save((err, userInfo) => {
        if(err) return res.json({ success : false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 1. 요청된 이메일을 데이터 베이스에서 있는지 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당되는 유저가 없습니다."
            })
        }

    // 2. 요청된 이메일이 있다면, 비밀번호가 동일한지 확인
        user.comparePassword(req.body.password, (err,isMacth) => {
            if(!isMacth) {
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                })
        
            }
    // 3. 비밀번호까지 같아면 해당 유저를 위한 token 생성         
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // token을 저장, 어디에? 쿠키, 로컬스토리지, 세션 등에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json( { loginSuccess: true, userId: user._id } )

            })

        })
    
    });

})

// auth route
app.get('/api/users/auth', auth, (req, res) => {
    // auth = middleware, 여기까지 미들웨어를 통과했다는 말은 Authentication = True!
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

// logout route
app.get('/api/users/logout', auth, (req, res) => {
    // mongoose method
    User.findByIdAndRemove({_id: req.user._id}, 
        {token: ""}, (err, user) => {
            if(err) return res.json({success: false, err});

            return res.status(200).send({
                success: true
            })
        })
})

// front server conncetion
app.get('/api/hello', (req, res) => {
    res.send('hello from node server!');
})

const port = 4000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})