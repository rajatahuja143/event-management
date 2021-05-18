var exports = module.exports = {};
var User  = require('../models/User');
var  Validator = require('validatorjs');
exports.index  = function (req,res){
    return res.json(req.user);
}
exports.update = function (req,res){
        var updateAble  = {};
        Object.keys(req.body).forEach(keys=>{
            switch(keys){
                case "bio":
                    updateAble.bio = req.body.bio;
                case "name":
                    updateAble.name = req.body.name;    
                default:
                    //
            }
        });
        if(!req.user) res.status(401).json({success:false,msg:"user not found"});
        User.findByIdAndUpdate(req.user._id,updateAble,function(err,user){
            if(err) res.status(404).json({ success:false,msg:"",err});
            res.json({success:true});
        });
 }