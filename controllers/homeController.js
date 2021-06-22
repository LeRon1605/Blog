const article = require('../database/models/article');
const user = require('../database/models/user');
function titleFormat(Obj){
	Obj.forEach(function(element){
		element.title = (element.title.length > 60) ? element.title.slice(0, 60) + '...' : element.title;
	})
}
class HomeController{
	index(req, res){
		Promise.all([article.find({}), user.findOne({_id: req.cookies._id})])
			.then(response => {
				let blogs = response[0];
				let userLogin = response[1];
				let followingBlogs = [];
				let popularBlogs = blogs.sort(function(a, b){
					return b.feedback.length - a.feedback.length;
				}).slice(0, 4);
				titleFormat(blogs);
				blogs = blogs.reverse().slice(0, 4);
				for (let i = 0;i < blogs.length;i++){
					if (userLogin.following.includes(blogs[i].author._id)) followingBlogs.push(blogs[i]);
				}
				followingBlogs = followingBlogs.slice(0,4);
				res.render('home', {blogs, popularBlogs, followingBlogs, userLogin})
			})
			.catch(err => console.log(err))
	}
}
module.exports = new HomeController();