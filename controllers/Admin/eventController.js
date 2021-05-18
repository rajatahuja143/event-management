var exports = module.exports = {};
let Event = require("../../models/Event"); 
var  Validator = require('validatorjs');
exports.index = function(req,res) {
    Event.find({})
    .skip(req.body.page)
    .limit(req.body.limit)
    .exec(function(err,users){
      if(err){
        return res.json(err);
      }
      return res.json(users);
    });
}
exports.show = function(req,res) {
  Event.findById(req.params.event_id).exec(function(err,event){
    if(err){
      return res.json(err);
    }
    return res.json(event);
  });
}
exports.update  = function (req ,res){
    Event.findByIdAndUpdate(req.params.event_id,req.body,function(err,event){
        if(err) return res.status(404).json({success:false,err});
        return res.json({success:true,event});
    });
}
exports.add  = function(req,res){
    req.body.user_id  = req.user._id;
  var validate  = new Validator(req.body,{
    name:"required",
    user_id:"required",
    type:"required",
    localtion:"required",
    discription:"required|string",
    start_time:"required",
    end_time:"required",
  }); 
  if(!validate.passes()){
    res.status(404).json(validate.errors);
  }
  req.body.approve  = 0;
  new Event(req.body).save(function(err,event){
    if(err) return res.status(404).json({success:false,err});
    return res.status(404).json({success:false,event});
});
}