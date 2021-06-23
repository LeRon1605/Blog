const user = require('../database/models/user');
const article = require('../database/models/article');
const mongoose = require('mongoose');
const cloudinary = require('../cloudinary');

const multer  = require('multer');
const upload = multer({ dest: 'public/upload/user' });
class AuthController{
	// [GET] auth
	indexAuth(req, res){
		res.redirect(`/auth/${req.cookies._id}`)
	}
	// [GET] auth/:id
	index(req, res){
		Promise.all([user.findOne({_id: req.params.id}), article.find({})])
			.then(response1 => {
				let userAccess = response1[0];
				let userArticle = response1[1].filter(function(element){
					return element.author.name == userAccess.username;
				})
				let followingUser = [];
				let followerUser = [];
				Promise.all([user.find({_id: userAccess.following}), user.find({_id: userAccess.follower})])
					.then(response2 => {
						response2[0].forEach(function(u){
							followingUser.push({
								name: u.username,
								_id: u._id
						    })
							
						})
						response2[1].forEach(function(u){
							followerUser.push({
								name: u.username,
								_id: u._id
							})
						})
						let isUser = false;
						let following = true;
						if (userAccess._id == req.cookies._id) isUser = true;
						if (userAccess.follower.includes(req.cookies._id)) following = false;
						let displayFollow = '', displayIsFollow = '', displayIsFollowing = '';
						if (isUser) displayFollow = 'd-none';
						else{
							displayFollow = 'd-block';
						}
						if (following) {
							displayIsFollow = 'd-block';
							displayIsFollowing = 'd-none'
						}else{
							displayIsFollow = 'd-none';
							displayIsFollowing = 'd-block';
						}
						res.render('user/auth', {userAccess, userArticle, displayFollow, displayIsFollowing, displayIsFollow, followingUser, followerUser});
					})
					.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
	}
	// [PUT] auth/addFollow/:id
	addFollow(req, res){
		user.findOne({_id: req.cookies._id})
			.then(userLogin => {
				user.findOne({_id: req.body.id})
					.then(async function(follower){
						userLogin.following.push(req.body.id);
						follower.follower.push(req.cookies._id);
						await userLogin.save();
						await follower.save();
						res.redirect(`/auth/${req.body.id}`);
					})
					.catch(err => {
						console.log(err);
					})
			})
			.catch(err => {
				console.log(err);
			})
	}
	// [DELETE] auth/deleteFollow/:id
	deleteFollow(req, res){
		Promise.all([user.findOne({_id: req.cookies._id}), user.findOne({_id: req.body.id})])
			.then(async (response) => {
				let userLogin = response[0];
				let follower = response[1];
				userLogin.following.splice(userLogin.following.indexOf(follower._id), 1)
				follower.follower.splice(follower.follower.indexOf(userLogin._id), 1);
				await userLogin.save();
				await follower.save();
				res.redirect(`/auth/${req.body.id}`);

			})
			.catch(err => {
				console.log(err);
			})
	}
	// [GET] auth/login
	loginIndex(req, res){
		res.render('user/login', {type: 'd-none'});
	}
	// [POST] auth/login
	login(req, res){
		user.findOne({name: req.body.name, password: req.body.password})
			.then(userLogin => {
				if (userLogin === null) res.render('user/login', {type: 'd-block'});
				else{
					res.cookie('_id', userLogin._id);
					res.redirect('/');
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
	// [GET] auth/register
	registerIndex(req, res){
		res.render('user/register');
	}
	// [POST] auth/register
	register(req, res){
		req.body.isComplete = false;
		req.body.sologan = '';
		req.body.avartar = 'public/Default.png';
		req.body.username = '';
		user.create(req.body)
			.then(() => {
				res.redirect('/auth/login');
			})
			.catch(err => {
				console.log(err);
			})
	}
	// [GET] auth/:_id/inf
	getInf(req, res){
		let id = req.params.id;
		res.render('user/registerInfo', {id});
	}
	// [PUT] auth/:id
	async completeProfile(req, res){
		let sologan = req.body.sologan;
		let username = req.body.username;
		const result = await cloudinary.uploader.upload(req.file.path);
		let avartar = result.secure_url;
		let isComplete = true;
		user.findOne({_id: req.params.id})
			.then(userLogin => {
				userLogin.sologan = sologan;
				userLogin.avartar = avartar;
				userLogin.username = username;
				userLogin.isComplete = isComplete;
				userLogin.save();
				res.redirect('/');
			})
			.catch(err => console.log(err))
	}
	// [GET] auth/logout
	logout(req, res){
		res.clearCookie('_id');
		res.redirect('/auth/login');
	}
}

module.exports = new AuthController();