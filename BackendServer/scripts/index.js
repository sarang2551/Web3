
const dotenv  = require('dotenv')


function init(){
var express = require('express')
const app = express()
const cor = require('cors')
const bodyParser = require("body-parser")
app.use(cor())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// Parse JSON bodies (as sent by API clients)
require('./routes')(app)

app.listen(process.env.PORT || 3000,()=>{
    console.log('server started')
})

}

init()
// const {pinataImage} = require("./mint-nft")
// const fs = require("fs")
// var path = String.raw`C:/Users/saran/OneDrive/Desktop/NirwanaWarehouse/uniMiscellaneous/Hackathons/Crypto.com/BackendServer/scripts/photo_6199251651135648752_x.jpg`
// const fileData = fs.readFile(path,(err,data)=>{
//     if(err) throw err
//     try{pinataImage(data)}
//     catch(e){throw e}
    
//     return
// })
//console.log(fileData)
