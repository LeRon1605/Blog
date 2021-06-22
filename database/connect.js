const mongoose = require('mongoose');
const url ="mongodb+srv://rubeha:ronle75@blog.diozp.mongodb.net/Blog"
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
