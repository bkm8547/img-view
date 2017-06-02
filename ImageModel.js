var mongoose = require('mongoose');

var imageSchema=mongoose.Schema({
	title : String,
	file : String
});

imageSchema.methods.speak = function () {
  var message = this.title
    ? "Meow name is " + this.title+","+this.file
    : "I don't have a file";
  console.log(message);
}
var Image = mongoose.model('Image', imageSchema);
module.exports=Image;