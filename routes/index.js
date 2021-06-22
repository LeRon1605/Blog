const homeRoute = require('./home');
const blogRoute = require('./blog');
const authRoute = require('./auth');
function route(app){
	app.use('/', homeRoute);
	app.use('/blog', blogRoute);
	app.use('/auth', authRoute);
}

module.exports = route;