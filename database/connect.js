const mongoose = require('mongoose');
function connect(){
	mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
			console.log('Connect to Database successfully!!');
		})
		.catch(() => {
			console.log('Connect failure to Database!!');
		})
}
module.exports = {
	connect
}
