var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  description: String
});

// var swiper = new Swiper('.swiper-container', {
//   slidesPerView: 'auto',
//   spaceBetween: 30,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   }
// });

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
