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
  res.cookie('ssid', res.locals.id, { httpOnly: false });
  return next();
};

module.exports = cookieController;
