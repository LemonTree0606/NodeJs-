var express = require('express');
var router = express.Router();
var userS = require('../sql/user');

router.get('/',(req,res)=>{
    
    userS.find({},(err,data)=>{
        if(err) {
          console.log(err)
        }
    
        res.render("login",{
          index:2,
          data:data
        });
    });
    
})

router.post('/in',(req,res,next)=>{
    let obj = req.body;
    console.log('我在longin的in表里面');
    console.log(obj);
    userS.findOne(obj,(err,data)=>{
        if(err){
            console.log(err);
            res.redirect("/register")
        }
        console.log(data);
        if(data){
            // 注意：cookie是res，session是req
             res.cookie('islogin','ok')
            //    req.session.islogin = 'ok'
            res.redirect("/pro");
        }else{
            res.redirect("/register")
        }
    })

})



module.exports = router;