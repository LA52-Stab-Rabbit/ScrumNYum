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
            console.log('successful login!!');
            res.locals.id = result.rows[0].id;
            console.log('res.locals.id!!!!', res.locals.id);
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
};

module.exports = userController;
