var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var event = new Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  location:{
    type: Number,
    required: true   
  },
  discription:{
    type: Number,
    required: true   
  },
  images:[{
      type:String
  }],
  start_time:{
      type:Date,
      required:true
  },
  end_time:{
    type:Date,
    required:true
},
approve:{
    type:Boolean,
    required:true
}
},{timestamps:true});

module.exports = mongoose.model('Event', event);
