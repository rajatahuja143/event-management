var exports = module.exports = {};
var User  = require('../models/User');
var Blog  = require('../models/Blog');
var  Comment = require('../models/Comment');
var  Validator = require('validatorjs');
var restFunctions = require('../helpers/restFunctions');
exports.index = function(req,res){
    //get all blogs category
    Blog.find({
        category: req.user.selected_category
    }).skip(req.params.skip)
    .limit(req.params.limit)
    .exec(function(err,blogs){
        if(err){ return res.json({success:false,err}); }
        res.json(blogs);
    });
}
exports.store  = function (req,res){
    req.body.user_id = req.user._id; 
    var validate  = new Validator(req.body,{
        title:"required|string",
        content:"required"
    }); 
    if(!validate.passes()){
        res.status(404).json(validate.errors);
    }
    new Blog(req.body).save(function(err,blog){
        if(err) res.status(404).json({success:false,err});
        User.findByIdAndUpdate(req.body.user_id,{$push: {
            blogs: blog._id
          }},function(err,user){
            if(err) res.status(404).json({success:false,err});
            res.json({success:true,blog:blog});
        });
    });
}
exports.show = function(req,res){
    Blog.findById(req.params.blog_id).populate('users',{path:"user",model:"User"}).exec(function(err,blog){
        if(err) res.status(404).json({success:false,err});
        if(!blog) res.json([]);   
        res.json(blog); 
    });
}
exports.update = function(req,res){
    Blog.findOneAndUpdate(req.params.blog_id,req.body,function(err,blog){
         if(err) res.status(404).json({success:false,err});
         res.json({success:true,blog});
    });
}
exports.search = function (req,res){
    var validate  = new Validator(req.body,{
        keyword:"required|string",
        page:"required",
        limit:"required"
    }); 
    if(!validate.passes()){
        res.status(404).json(validate.errors);
    }
    Blog.find({$or:[
       { title:/`${ req.body.keyword }`/},
       {selected_category:/`${ req.body.keyword }`/}
    ]})
    .skip(req.body.page *req.body.limit)
    .limit(req.body.limit)
    .then(data=>{
        res.json(data);
    }).catch(err=>{
        res.status(404).json({success:false,err});
    });
}
exports.likeDislike = function(req,res){
    var validate  = new Validator(req.body,{
        like:"required",
    }); 
    if(!validate.passes()){
        res.status(404).json(validate.errors);
    }
    if(req.body.like ==1){
        Blog.findOne({
            _id:req.params.blog_id,
        },function(err,blog){
            if(err) return res.json({success:false,err});
            if(!blog) return  res.json({success:false,err});
            blog.like_count.push({
                user_id:req.user._id,
                ip:req.body.ip
            });
            blog.save(err=>{
                if(err)  res.status(404).json({success:false,err});
                restFunctions.sendNotification(req.user.name,"like",blog.user_id,req.user.token);
                res.json({success:true});
            })
        });  
    }
    else{
        Blog.findOneAndUpdate({
            _id:req.params.blog_id,
        },{
            $pull:{
                like_count:{user_id:req.user._id}
            }
        },function(err,blog){
            if(err) res.json({success:false,err});
            res.json({success:true});
        });  
    }
}
exports.saveUnsave = function(req,res){
    var validate  = new Validator(req.body,{
        save:"required",
    }); 
    if(!validate.passes()){
        res.status(404).json(validate.errors);
    }
    if(req.body.save ==1){
        Blog.findOneAndUpdate({
            _id:req.params.blog_id,
        },function(err,blog){
            if(err) res.json({success:false,err});
            blog.save_count
            .push({
                user_id:req.user._id,
                ip:req.body.ip
            });
            blog.save(err=>{
                if(err)  res.status(404).json({success:false,err});
                restFunctions.sendNotification(req.user.name,"save",blog.user_id,req.user.token);
                res.json({success:true});
            })
        });  
    }
    else{
        Blog.findOneAndUpdate({
            _id:req.params.blog_id,
        },{
            $pull:{
                save_count:{user_id:req.user._id}
            }
        },function(err,blog){
            if(err) res.json({success:false,err});
            res.json({success:true});
        });  
    }
}
exports.view = function(req,res){
        Blog.findById(req.params.blog_id,function(err,blog){
            if(err) return  res.json({success:false,err});
            if(!blog) return  res.json({success:false,err});
            var query  = {};
            if(req.user){
                query.user_id = req.user._id;
            }
            else {
                query.ip  = req.body.ip;
            }
            blog.view_count
            .push(query);
            blog.save(err=>{
                if(err) return res.status(404).json({success:false,err});
                console.log('whaa');
                return res.json({success:true});
            })
        });  
}
exports.comment  = function(req,res){
    var  dataToPass = req.body;
    dataToPass.blog_id = req.params.blog_id;
    dataToPass.user_id  = req.user._id;
    if(!req.params.parent_id){
        dataToPass.parent_id = req.params.parent_id;
    }
    var validate  = new Validator(dataToPass,{
        user_id:"required",
        content:"required"
    }); 
    if(!validate.passes()){
        res.status(404).json(validate.errors);
    }
    new Comment(dataToPass).save(function(err,comment){
        if(err) return res.json({success:false,err});
        return res.json({success:true,comment});
    })
}