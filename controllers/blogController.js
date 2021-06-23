const article = require('../database/models/article');
const users = require('../database/models/user');

const cloudinary = require('../cloudinary');

const multer  = require('multer');
const upload = multer({ dest: 'public/upload/user' });
function titleFormat(Obj){
	Obj.forEach(function(element){
		element.title = (element.title.length > 60) ? element.title.slice(0, 60) + '...' : element.title;
	})
}
class BlogController{
	// [GET] /blog/:id
	index(req, res){
		article.find({})
			.then(blogs => {
				let blog = blogs.find(function(e){
					return e._id == req.params.id
				});
				let popularBlog = blogs.sort(function(a, b){
					return b.feedback.length - a.feedback.length;
				}).slice(0,3);
				users.findOne({_id: blog.author._id})
					.then(author => {
						res.render('blog/blog', {blog,author,popularBlog});
					})
					.catch(err => {
						console.log(err);
					})
				
			})
			.catch(err => {
				console.log(err);
			})
	}
	// [GET] /blog/lasted
	lastedBlog(req, res){
		article.find({})
			.then(blogs => {
				titleFormat(blogs);
				blogs = blogs.reverse();
				res.render('blog/lastedBlog', {blogs, title: 'Lasted Blogs'});
			})
			.catch(err => console.log(err))
	}
	// [GET] /blog/popular
	popularBlog(req, res){
		article.find({})
			.then(blogs => {
				titleFormat(blogs);
				blogs = blogs.reverse();
				blogs = blogs.sort(function(a, b){
					return b.feedback.length - a.feedback.length;
				})
				res.render('blog/lastedBlog', {blogs, title: 'Popular Blogs'});
			})
			.catch(err => console.log(err))
	}
	// [GET] /blog/following
	followingBlog(req, res){
		Promise.all([article.find({}), users.findOne({_id: req.cookies._id})])
			.then(response => {
				let blogs = response[0];
				let userLogin = response[1];
				let fBlogs = [];
				for (let i = 0;i < blogs.length;i++){
					if (userLogin.following.includes(blogs[i].author._id)) fBlogs.push(blogs[i]);
				}
				fBlogs = fBlogs.reverse();
				blogs = fBlogs;
				titleFormat(blogs);
				res.render('blog/lastedBlog', {blogs, title: 'Following'});
			})
			.catch(err => console.log(err))
	}
	// [GET] /blog/category
	categoryIndex(req, res){
		article.find({})
			.then(blog => {
				let popularBlog = blog.sort(function(a, b){
					return b.feedback.length - a.feedback.length;
				}).slice(0, 3);
				let arr = blog.reduce(function(accumulator, element){
					element.tag.forEach(function(tagName){
						if (!accumulator.includes(tagName.trim())) accumulator.push(tagName.trim());
					})
					return accumulator;
				}, []);
				let result = {};
				arr.forEach(function(type){
					result[type] = blog.filter(function(element){
						return element.tag.includes(type.trim());
					})
					result[type].name = type;
				})
				res.render('blog/category', {result ,popularBlog});
			})
			.catch((err) => console.log(err))
	}
	// [GET] /blog/category/:type
	categoryTypeIndex(req, res){
		article.find({})
			.then(blogs => {
				let result = {};
				let popularBlog = blogs.sort(function(a, b){
					return b.feedback.length - a.feedback.length;
				}).slice(0, 3);
				let blog = blogs.filter(function(element){
					return element.tag.includes(req.params.type)
				})
				result[req.params.type] = blog;
				result[req.params.type].name = req.params.type;
				let err;
				if (result[req.params.type].length === 0) err = 'Nothing in here yet.';
				res.render('blog/category', {result, err, popularBlog});
			})
			.catch(err => console.log(err))
	}
	// [GET] /blog/add
	addIndex(req, res){
		res.render('blog/add')
	}
	// [POST] /blog/add
	async add(req, res){
		const result = await cloudinary.uploader.upload(req.file.path);
		let image = result.secure_url;
		let tag = req.body.tag.split(',').map(function(element){
			return element.trim();
		});
		users.findOne({_id: req.cookies._id})
			.then(user => {
				article.create({
					title: req.body.title,
					content: req.body.content,
					author: {
						name: user.username,
						_id: user._id
					},
					rated: 0,
					tag: tag,
					image: image,
					feedback: [] 
				})
					.then(newBlog => {
						user.article.push(newBlog._id);
						user.save();
						res.redirect('/');
					})
				
			})
			.catch(err => console.log(err))
	}
	// [PUT] /blog/:id
	addComment(req, res){
		article.findOne({_id: req.params.id})
			.then(blog => {
				let feedbacks = blog.feedback;
				let comment = req.body.comment;
				let now = new Date().toDateString(); 
				let newFeedbacks = {};
				users.findOne({_id: req.cookies._id})
					.then(user => {
						newFeedbacks = {
							author: {
								name: user.username,
								_id: user._id,
								avartar: user.avartar
							},
							comment,
							createdAt: now
						}
						feedbacks.push(newFeedbacks);
						blog.updateOne({feedback: feedbacks})
							.then(() => {
								res.redirect(`/blog/${blog._id}`);
								console.log('Done');
							})
							.catch(err => {
								console.log(err);
							})
					})
			})
			.catch(err => {
				console.log(err);
			})
	}

}
module.exports = new BlogController();