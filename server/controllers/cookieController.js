const cookieController = {};

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
  const ssid = bcrypt.hash(`${res.locals.user.username} superCookie8675309`, 12)
  res.cookie('ssid', ssid, { httpOnly: true });
  
  const query = `
  INSERT INTO users (ssid)  
  VALUES
  ($1)
  `;

  db.query(query, [ssid])
  .then((response) => {
    // insert logic for randomized, more secure ssid
    res.locals.user.ssid = ssid;
    return next();
  })
  .catch((err) => {
    return next({
      log: 'Express error in cookieController.setSSIDCookie',
      status: 500,
      message: {
        err: 'error in cookieController.setSSIDCookie - issue with ssid assignment',
      },
    });
  });
  return next();
};

module.exports = cookieController;
