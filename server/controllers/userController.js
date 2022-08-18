const db = require('../models/models.js');
const bcrypt = require('bcrypt');

const userController = {};

// verifyUser - Obtain username and password from the request body, locate the appropriate user in the database, and then authenticate the submitted password against the password stored in the database.

userController.createUser = (req, res, next) => {
  console.log('in userController.createUser');
  const { username, password } = req.body;
  const pass = bcrypt.hashSync(password, 12); //or async await
 

  const query = `
  INSERT INTO users (username, password)  
  VALUES
  ($1, $2)
  `;

  db.query(query, [username, pass])
    .then((response) => {
      // insert logic for randomized, more secure ssid
      res.locals.user.username = username;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error in userController.createUser',
        status: 500,
        message: {
          err: 'error in userController.createUser - issue with user creation',
        },
      });
    });
};

userController.verifyUser = (req, res, next) => {
  console.log('in userController.verifyUser');
  const { username, password } = req.body;
  if (!username || !password) return next('Missing username or password in userController.verifyUser.');

  const query = `
  SELECT * 
  FROM users u
  WHERE u.username = $1  
  `;

  db.query(query, [username])
    .then((result) => {
      if (result.rows.length === 0) {
        console.log('no user in DB');
        res.redirect('/signup');
      } else {
          console.log('checking password');
          // insert logic for randomized, more secure ssid; try bcrypt compare if time USE BCRYPT COMPARE
          if (result.rows[0].password === bcrypt.hash(password, 12)) {
            res.locals.user.username = result.rows[0].username;
            return next();
          } else {
            res.redirect('/signup');
          }
        }
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught unknown error in userController.verifyUser',
        status: 500,
        message: {
          err: 'error in userController.verifyUser - login credentials incorrect',
        },
      });
    });
};

module.exports = userController;
