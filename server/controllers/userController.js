const { default: axios } = require('axios');
const db = require('../models/models.js');
const bcrypt = require('bcrypt');
const { Octokit, App } = require('octokit');

const userController = {};

// verifyUser - Obtain username and password from the request body, locate the appropriate user in the database, and then authenticate the submitted password against the password stored in the database.

userController.createUser = (req, res, next) => {
  let username, password;
  // if res.locals.username exists, enter GH user control flow 
  if (res.locals.githubUsername) {
    console.log('dealing with Github user in userController.createUser');
    username = res.locals.githubUsername;
    password = '';
  }
  // else, go through normal create user flow 
  else {
    console.log('dealing with NON-Github user in userController.createUser');
    console.log('req.body', req.body)
    username = req.body.username;
    password = bcrypt.hashSync(req.body.password, 12);
    console.log('username is', username);
    console.log('password is', password);
  }

  console.log('in userController.createUser');

  // will need to change "id" to "username" in this query
  const query = `
  INSERT INTO users (id, password)  
  VALUES
  ($1, $2);
  `;

  db.query(query, [username, password])
    .then((response) => {
      // insert logic for randomized, more secure ssid
      res.locals.user = {};
      res.locals.user.username = username;
      console.log('username in .then after insert: ', res.locals.user.username)
      return next();
    })
    .catch((err) => {
      console.log('in error handler in userController.createUser')
      return next({
        log: 'Express error handler caught in userController.createUser',
        status: 400,
        message: {
          err: 'error in userController.createUser - issue with user creation',
        },
      });
    });
};

userController.verifyUser = (req, res, next) => {
  console.log('in userController.verifyUser');

  const { username, password } = req.body;

  const query = `
  SELECT * 
  FROM users u
  WHERE u.id = $1  `;

  db.query(query, [username])
    .then((result) => {
      if (result.rows.length === 0) {
        console.log('no user in DB');
        res.redirect('/signup');
      } else {
          console.log('check password');
          if (result.rows[0].password === password) {
            // insert logic for randomized, more secure ssid
            res.locals.id = result.rows[0].id;
            return next();
          } else {
            res.redirect('/signup');
          }
        }
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: {
          err: 'error in userController.verifyUser - login credentials incorrect',
        },
      });
    });

  }

  userController.handleGithubRedirect = (req, res, next) => {
    // get code from GH
    const code = req.query.code;
    const body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };

    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((response) => response.data.access_token)
      .then((token) => {
        console.log('My token:', token);

        // save token to res.locals
        res.locals.access_token = token;
        // return next (used to be redirect to scrum)
        return next();
      })
      .catch((err) => {
        console.log('error in OAuth fetch:', err)
        res.status(500).json({err: err.message})
      });
  }
  

  userController.checkGithubUser = (req, res, next) => {
    // make axios GET request to github to get GH username
    console.log('running checkGithubUser');
    console.log('token from res.locals is:', res.locals.access_token);
    // declare query string to see if user exists in db
    const query = `
    SELECT * 
    FROM users u
    WHERE u.id = $1  `;
    // then check their GH username to db (user "github"+ username)
    
    // attempting with OKTOKIT (https://github.com/octokit/octokit.js)
    const octokit = new Octokit({ auth: res.locals.access_token });
    octokit.request('GET /user', {})
      .then(result => {
        // attach username to res.locals.username
        console.log('result from OCTOKIT:', result.data.login);
        const githubUsername = `github_${result.data.login}`;
        // BETTER WAY WITH OBJECT STRUCTURING(??)
        res.locals.githubUsername = githubUsername;
        // github_parkersteinberg


        // query db to see if github account exists in the db
        db.query(query, [githubUsername])
          .then((result) => {
            // if user doesn't exist, pass them along to createUser middleware
            if (result.rows.length === 0) {
              console.log("SENDING USERCONTROLLER TO CREATEUSER");
              return userController.createUser(req, res, next)
            } else {
              // instead, pass them to verifyuser 
                console.log('check password');
                if (result.rows[0].password === password) {
                  // insert logic for randomized, more secure ssid
                  res.locals.id = result.rows[0].id;
                  return next();
                } else {
                  res.redirect('/signup');
                }
              }
          })
          .catch((err) => {
            return next({
              log: 'Express error handler caught unknown middleware error',
              status: 400,
              message: {
                err: 'error in userController.verifyUser - login credentials incorrect',
              },
            });
          });
        // if account does not yet exist in db --> send to createUser middleware? 

        // if account does exists --> send to verify user middleware, then 
      })
      

    // once we get the GH username, check to see if their account exists in the db
    // if account exists
      // attach username to res.locals and invoke next middleware 
    // if account does not exist
      // add entry to users table where username = github username or github email
      // attach username to res.locals nad invoke next middleware 

  };

module.exports = userController;
