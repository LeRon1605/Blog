const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/blog";
function connect(){
  try{
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
          console.log('Connect to Database successfully!!');
        })
        .catch(() => {
          console.log('Connect failure to Database!!');
        })
  }catch(e){
    console.log(e);
  }
	
}
module.exports = {
	connect
}
//"mongodb+srv://rubeha:ronle75@blog.diozp.mongodb.net/Blog"