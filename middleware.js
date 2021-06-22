const user = require('./database/models/user');
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
}

module.exports = new middleware();