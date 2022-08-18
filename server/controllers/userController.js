const { default: axios } = require('axios');
const db = require('../models/models.js');

const userController = {};

// verifyUser - Obtain username and password from the request body, locate the appropriate user in the database, and then authenticate the submitted password against the password stored in the database.

userController.createUser = (req, res, next) => {
  console.log('in userController.createUser');
  const { username, password } = req.body;

  console.log(req.body);

  const query = `
  INSERT INTO users (id, password)  
  VALUES
  ($1, $2)
  `;

  db.query(query, [username, password])
    .then((response) => {
      // insert logic for randomized, more secure ssid
      res.locals.id = username;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught unknown middleware error',
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
    // if we can't get GH username, then we can user their email as unique identifier to save to db 
    const opts = { headers: { 
      accept: 'application/json',
      Authorization: 'token' + res.locals.access_token
      } 
    };
    axios
      .get('https://api.github.com/user')
      .then(result => {
        console.log(result)
        // return next
        return next();
      })
      .catch(err => {
        console.log('error in userController.checkGithubUser:', err)
        return next(err);
      })
      

    // once we get the GH username, check to see if their account exists in the db
    // if account exists
      // attach username to res.locals and invoke next middleware 
    // if account does not exist
      // add entry to users table where username = github username or github email
      // attach username to res.locals nad invoke next middleware 

    // invoke next middleware
  };

module.exports = userController;
