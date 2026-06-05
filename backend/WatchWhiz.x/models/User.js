const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/WatchWhiz_x")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    
  },
  watchlist: [{
    imdbID: String,
    Title: String,
    Poster: String,
    Year: String
  }],
  dp: {
    type: String, // URL or file path
    default: ''
  },
  
}, {
  timestamps: true
});
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema);
