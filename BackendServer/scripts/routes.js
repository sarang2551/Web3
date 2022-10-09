const {pinataImage} = require("./mint-nft")
module.exports = function(app){
    app.post('/pinataImage',(req,res)=>{
        console.log(req.body)
        // request should contain parsed image data
        pinataImage(req.body)
    })
}