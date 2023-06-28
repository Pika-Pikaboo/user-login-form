const express = require('express'),
  app = express(),
  path = require('path'),
  mongoose = require('mongoose'),
  port = 5000,
  userSignInController = require('./controllers/userSignInController'),
  userLogInController = require('./controllers/userLogInController'),
  crudOperationsController = require('./controllers/crudOperationsController'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session');

mongoose.connect('mongodb://localhost:27017/newdb')
  .then(() => console.log('Connected to Mongoose Server successfully...!'))
  .catch((e) => console.error(e.stack));

app.use(express.urlencoded({
  extended: false,
}));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('keyboard fighter'));
app.use(expressSession({
  secret: "keyboard fighter",
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("<h1>Something went wrong!</h1>");
});

app.get('/', userSignInController.index);
app.get('/users', userSignInController.users);
app.get('/users-table', userSignInController.usersTable);
app.get('/login', userLogInController.index);
app.get('/users/:id/view', crudOperationsController.index);
app.get('/users/:id/data', crudOperationsController.fetch);
// app.get('/users/:id/edit', crudOperationsController.edit);

app.post('/login-user',
  userLogInController.loginUser,
  userLogInController.redirectView);
app.post('/create-user',
  userSignInController.createUser,
  userSignInController.redirectView);

app.delete('/users/:id/delete',
  crudOperationsController.delete,
  crudOperationsController.redirectView);

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
