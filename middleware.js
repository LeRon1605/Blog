const user = require('./database/models/user');
const article = require('./database/models/article');
class middleware{
	// If not login yet, redirect to login page
	isLogin(req, res, next){
		if (!req.cookies._id){
			res.redirect('/auth/login');
		}else{
			next();
		}
	}
	// If login, prevent to login page and register page
	preventLogin(req, res, next){
		if (!req.cookies._id){
			next();
		}else{
			res.redirect('/');
		}
	}
	// Check if is Complete Profile
	isComplete(req, res, next){
		user.findOne({_id: req.cookies._id})
			.then(userLogin => {
				if (userLogin.isComplete == false) res.redirect(`/auth/${userLogin._id}/inf`);
				else next();
			})
			.catch(err => console.log(err));
	}
	// Prevent complete profile
	preventProfile(req, res, next){
		user.findOne({_id: req.cookies._id})
			.then(userLogin => {
				if (userLogin.isComplete == false) next();
				else res.redirect('/')
			})
			.catch(err => console.log(err));
	}
	// Edit [GET] /blog/:id/edit
	async editAuth(req, res, next){
		let blog = await article.findOne({_id: req.params.id});
		if (blog.author._id == req.cookies._id) next();
		else res.redirect(`/blog/${req.params.id}`);
	}
}

module.exports = new middleware();