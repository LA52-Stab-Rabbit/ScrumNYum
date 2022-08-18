const db = require('../models/models.js');

const sessionController = {};

// IsLoggedIn - find the appropriate session for this request in the database, then verify whether or not the session is still valid.

sessionController.isLoggedIn = (req, res, next) => {
  console.log('in sessionController.isLoggedIn');

  const query = `
  SELECT * 
  FROM sessions s
  WHERE s.id = $1 
  `;
  // does s.id need to be changed to ssid now?

  db.query(query, [req.cookies.ssid])
    .then((result) => {
      console.log('session controller query result:', result)
      if (result.rows[0] === req.cookies.ssid) res.locals.signedIn = true; //does this need to become user specific?
      else res.locals.signedIn = false;
      // do we need to redirect to signup
      return next();
    })

    .catch((err) => {
      return next({
        log: 'Express error handler caught error in sessioncontroller.isLoggedIn',
        status: 500,
        message: { err: 'in sessionController.isLoggedIn' },
      });
    });
};

// StartSession - create and save a new Session into the database.

sessionController.startSession = (req, res, next) => {
  // write code here
  console.log('in sessionController.startSession');

  console.log('res.locals.user.id', res.locals.user.id);

  const query = `
  INSERT INTO sessions (id) 
  VALUES
  ($1)
  ON CONFLICT (id) DO NOTHING
  `;

  db.query(query, [res.locals.user.id])
    .then((response) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'in sessionController.isLoggedIn' },
      });
    });
};

module.exports = sessionController;
