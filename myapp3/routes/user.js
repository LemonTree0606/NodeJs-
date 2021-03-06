var express = require('express');
var router = express.Router();
var userS = require('../sql/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  // 渲染到页面中
  userS.find({},(err,data)=>{
    if(err) {
      console.log(err)
    }

    res.render("user",{
      index:2,
      data:data
    });
});

});

// 增加操作
router.get("/add", function (req, res, next) {
  res.render("userAdd", {
    index: 2,
  });
});

router.post("/addAction", function (req, res, next) {

console.log('我在用户增加界面');
  let obj = req.body;
  console.log(obj);
  userS.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/user");
       
  })
   
});
// 删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query)

  userS.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     res.redirect("/user");
  })
})
// 修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id
  console.log(req.query)
  const _id = req.query._id;
  console.log("_id", _id);

  userS.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了用户/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdate',{
      index:2,
      data:data
    })
  })

 
});

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在用户/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  console.log('obj_id',obj._id)

  userS.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log(1111);
      console.log(data)
      res.redirect("/user");

  })

  
});
// 查找操作
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
 
  let reg = new RegExp(obj.search);
  userS.find({userName:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index: 2,
       data,
    });
  })

 
});

module.exports = router;
