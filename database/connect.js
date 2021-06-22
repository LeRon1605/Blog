const mongoose = require('mongoose');
function connect(){
	mongoose.connect("mongodb+srv://rubeha:<ronle75>@blog.diozp.mongodb.net/Blog?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
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
