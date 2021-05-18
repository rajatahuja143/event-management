var exports = module.exports = {};
var Category = require('../models/Category');
var User  = require('../models/User');
exports.index = function (req,res){
  Category.find({},function(err,category){
    if(err) return res.status(404).json({success:false,msg:"somthing went wrong"});
    if(!category) return res.json({success:false,msg:"somthing went wrong"});
      return res.json(category);
  });
}

exports.update = function(req,res){
  if(req.body.selected_category == ""){
     res.json({
       success:false,
       errors:{
         type:"selected_category",
         msg:"selected_category is not added"
       }
     })
  }
   User.findOneAndUpdate({ _id : req.user._id },{ selected_category:req.body.selected_category }).then(function(user){
     res.json({success:true});
   }).catch(function(err){
      res.status(404).json({success:false,err});
   });
}
