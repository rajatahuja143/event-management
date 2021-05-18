//home controller
var Notification = require('../models/Notification');
exports.notification = function (req,res){
    Notification.find({user_id:req.params.user_id},function(err,notification){
        if(err) res.json({succes:false,err});
        res.json(notification);
    });
}