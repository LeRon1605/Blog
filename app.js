require('dotenv').config()
const express = require('express');
const app = express();

const server = require('http').createServer(app); 
const io = require('socket.io')(server);

const methodOverride = require('method-override');
const exphbs  = require('express-handlebars');
const Handlebars = require("handlebars");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
// Connect to DataBase
const db = require('./database/connect');
db.connect();

app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

// Set static files
app.use(express.static(__dirname + '/public'));

// Set template view engine
app.engine('handlebars', exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
}));
Handlebars.registerHelper("sum", function(a, b) {
  return a + b;
});
app.set('view engine', 'handlebars');
app.set('views', './views');

// Import routes
const routes = require('./routes/index');
routes(app);


function isNotExist(user, newUserPath){
  for (let i = 0;i < user.length;i++){
    if (user[i].path == newUserPath) return false;
  }
  return true;
}
let users = [];
io.on('connection', (socket) => {
  socket.on('user_connect', (userConnect, userPath, userAvartar) => {
    let newUserLogin = {
      name: userConnect,
      path: userPath,
      avartar: userAvartar,
      socket: socket.id
    };
    if (isNotExist(users, newUserLogin.path)) users.push(newUserLogin);
    io.emit('userOnline', users);
  })
  socket.on('disconnect', () => {
    for (let i = 0;i < users.length;i++){
      if (users[i].socket === socket.id){
        users.splice(i, 1);
        break;
      } 
    }
    io.emit('userOnline', users);
  })
  socket.on('user_logout', function(userPath){
    for (let i = 0;i < users.length;i++){
      if(users[i].path === userPath){
        users.splice(i, 1);
        break;
      }
    }
    io.emit('userOnline', users);
  })
})

server.listen(process.env.PORT || 8080)