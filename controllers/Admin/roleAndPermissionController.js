var exports = module.exports = {};
var Role  = require('../../models/Role');
var Permission  = require('../../models/Permission');
exports.roles = function(req,res){
    Role.find({}).populate('roleHasPermissions').exec(function(err,roles){
        if(err) res.json({success:false,err});
        res.json(roles);
    });
}

exports.permission = function(req,res){
    Permission.find({},function(err,permission){
        if(err) res.json({success:false,err});
        res.json(permission);
    });
}

exports.addPermission  = function(req,res){
    ['crudUser','crudAdmin'].forEach(d=>{
        new Permission({
            name:d
        }).save(e=>{

        });
    });
}