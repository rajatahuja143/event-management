var exports = module.exports = {};
let User = require("../../models/User"); 
var  Validator = require('validatorjs');
exports.index = function(req,res) {
    User.find({}).exec(function(err,users){
      if(err){
        return res.json(err);
      }
      return res.json(users);
    });
}
exports.show = function(req,res) {
  User.findById(req.params.user_id).exec(function(err,users){
    if(err){
      return res.json(err);
    }
    return res.json(users);
  });
}

exports.unableDisable  = function(req,res){
  var validate  = new Validator(req.body,{
    disable:"required"
  }); 
  if(!validate.passes()){
    res.status(404).json(validate.errors);
  }
  var current_user_id = req.params.user_id;
  var  { disable }  = req.body;
  User.findById(current_user_id,function(err,user){
    if(err) res.json({success:false,err})
    user.disable = disable;
    user.save(err=>{
      if(err) res.json({success:false,err})
      res.json({ success:true });
    })
  });
}