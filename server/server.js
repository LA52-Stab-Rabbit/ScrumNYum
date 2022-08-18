const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
//console.log('env:', process.env);

// import controllers
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

const PORT = 3000;
const app = express();
app.use(express.json()); // recognize incoming request as Json Object
app.use(express.urlencoded({ extended: true })); // parse incoming string or array request
app.use(cookieParser()); // allow parsing of req.cookies

// require routers
const apiRouter = require('./routes/api.js');
const oauthRouter = require('./routes/Oauth.js');

// serve static assets
app.use('/src', express.static(path.resolve(__dirname, '../src')));
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

// route to apiRouter
app.use('/api', apiRouter);

// route to oauthRouter
app.use('/oauth', oauthRouter);

// get routes
app.get(['/', '/signup'], (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
});

app.get(['/scrum', '/settings'], sessionController.isLoggedIn, (req, res) => {
  if (res.locals.signedIn) {
    console.log('user is signed in');
    res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
  } else {
    console.log('user not logged in');
    res.redirect('/');
  }
});

// login to sign up

app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    // creating a cookie with value of userid
    res.cookie("userid", res.locals.id, {httpOnly: true});
    console.log('login route complete');
    res.redirect('/scrum');
  }
);

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log('signup route complete');
    res.redirect('/scrum');
  }
);

// local error handler
app.use('*', (req, res) => {
  return res.status(404).send('Not Found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error hath occured!' },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).send(errorObj.msg);
});

// handle parsing request body
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
