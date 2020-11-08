var express = require('express');
var router = express.Router();
var userS = require('../sql/user');

router.get('/',(req,res,next)=>{
    console.log('我是注册表');
   
    
    res.render("register");
    
});

// 解决重复用户注册
router.post('/in',(req,res,next)=>{
    console.log('我在注册表的in里面');
    let obj = req.body;
    console.log(obj);
    console.log(1111,obj.userName);
    if(!obj.userName){
        userS.findOne({userName:obj.userName},(err,data)=>{
            if(err){
                console.log(err);
            }
            if(data){
                res.redirect('/register')
            }else{
                userS.insertMany(obj,(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(data);
                    res.redirect('/login')
                })
                
            }
        })
    }else{
        res.redirect('/register')
    }
    // userS.findOne({userName:obj.userName},(err,data)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     if(data){
    //         res.redirect('/register')
    //     }else{
    //         userS.insertMany(obj,(err,data)=>{
    //             if(err){
    //                 console.log(err);
    //             }
    //             console.log(data);
    //             res.redirect('/login')
    //         })
            
    //     }
    // })



     //第二种写法
//    user.insertMany(obj,(err,data)=>{
//     if(err) {
//         console.log(err)
//     }
//     console.log(data)

//     if(data) {
//         res.redirect('/login3')
//     }else {
//         res.redirect('/register3')
//     }

// })



    //第三种写法
//   user.findOne({username:obj.username}, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     if (data) {
//       res.redirect("/register3");
//     } else {
//       user.insertMany(obj, (err, data) => {
//         if (err) {
//           console.log(err);
//         }
//         console.log(data);

//         if (data) {
//           res.redirect("/login3");
//         } else {
//           res.redirect("/register3");
//         }
//       });
//     }
//   });
})






// router.post('/in',(req,res,next)=>{
//     console.log('我在register的in里面');
//     let obj = req.body;
//     console.log(obj);
//     // let str = /\S/;
//     userS.insertMany(obj,(err,data)=>{
//         if(err){
//             console.log(err);
//             res.redirect('/');
//         }
//         console.log(data);
//         // let {userName,userPassword} = obj;
//         // // console.log(userName,userPassword);
//         // if(!(str.test(userName) || str.test(userPassword))){
//         //     return res.redirect('login')
//         // // }else{
//         // //     res.redirect('/')
//         // }
//         if(data){
//             res.redirect('/login')
//         }else{
//             res.redirect('/register')
//         }
//     })
    
    
// })


module.exports = router;