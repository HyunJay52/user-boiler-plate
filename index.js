const express = require('express') // express module
const app = express() // app
const port = 4000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jaykim:pRfg5Vz5mN6dzBJv@boilerplate.3v5zp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected ✅");
}).catch(err => console.log("error = ", err))


app.get('/', (req, res) => { // root directory
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})