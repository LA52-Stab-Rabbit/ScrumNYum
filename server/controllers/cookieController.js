const cookieController = {};
const bcrypt = require('bcrypt');

// setSSIDCookie - store the user id in a cookie
cookieController.clearSSIDCookie = (req, res, next) => {
  // set ssid cookie
  console.log('in cookieController.clearSSIDCookie');
  res.clearCookie('ssid');
  return next();
};
// setSSIDCookie - store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
  // set ssid cookie
  console.log('in cookieController.setSSIDCookie');

  const ssid = bcrypt.hashSync(`${res.locals.user.username} superCookie8675309`, 12);
  res.cookie('ssid', ssid, {httpOnly: true})
  console.log('ssid IS:', ssid);
  // save ssid to res.locals.user
  res.locals.user.ssid = ssid;

  return next();

  // ! Change id to username when new db takes effect
  /* 
  New query should be:
  UPDATE users 
    SET ssid = ($1)
    WHERE username = $2;

  */
  // const query = `
  // INSERT INTO sessions (id) 
  // VALUES
  // ($1)
  // ON CONFLICT (id) DO NOTHING
  // `;
  // // ! Make sure to add res.locals.user.username as second element in array argument
  // db.query(query, [ssid])
  //   .then((response) => {
  //     console.log('in query return after adding session to db')
  //     // insert logic for randomized, more secure ssid
  //     res.locals.user.ssid = ssid;
  //     return next();
  //   })
  //   .catch((err) => {
  //     return next({
  //       log: 'Express error in cookieController.setSSIDCookie',
  //       status: 500,
  //       message: {
  //         err: 'error in cookieController.setSSIDCookie - issue with ssid assignment',
  //       },
  //     });
  //   });
};

module.exports = cookieController;
