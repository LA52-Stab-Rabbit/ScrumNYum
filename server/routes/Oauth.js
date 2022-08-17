const express = require('express');
const router = express.Router();
const axios = require('axios'); //axios required for post request; fetch only available to backend on most recent version of node and requires additional setup

// import controllers 

// may not need this
router.get('/', (req, res) => {
    console.log('in get route');
    const scope = 'read:user%20user:email%20public_repo';
    return res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=${scope}`);
})

router.get('/redirect', (req, res) => {
   // console.log('request is: ', req)
   //console.log('response is: ', res);
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

      // save access token to cookies?
      // set expiration date?
      
      res.redirect('/scrum');
    })
    .catch((err) => {
      console.log('error in OAuth fetch:', err)
      res.status(500).json({err: err.message})
    });
   
})

module.exports = router;