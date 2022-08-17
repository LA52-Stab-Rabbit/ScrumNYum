const express = require('express');
const router = express.Router();
const axios = require('axios');

// import controllers 

// may not need this
router.get('/', (req, res) => {
    console.log('in get route');
    return res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
})

router.get('/redirect', (req, res) => {
   // console.log('request is: ', req)
   //console.log('response is: ', res);
  const code = req.query.code;
  console.log('code ISSSSSSS', code);
  console.log('client_id is: ', process.env.CLIENT_ID)
  console.log('client_secret is: ', process.env.CLIENT_SECRET)
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
      res.redirect('/scrum');
    })
    .catch((err) => {
      console.log('error in OAuth fetch:', err)
      res.status(500).json({err: err.message})
    });

    //ATTEMPT WITH FETCH
    // URL that we used: ?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}
    // fetch(`https://github.com/login/oauth/access_token`, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     // 'Content-Type': 'application/json'
    //   },
    //   body: {
    //     client_id: process.env.CLIENT_ID,
    //     client_secret: process.env.CLIENT_SECRET,
    //     code
    //   }
    // })
    //   .then(response => {
    //     console.log('response before we json', response);
    //     console.log('response data access token', response.data.access_token);
    //     response.json()
    //   })
    //   .then((data) => {
    //     console.log('response body from github: ', data);
    //     // res.redirect(`/?token=${access_token}`)
    //     res.redirect('/scrum');
    //   })
    //   .catch((err) => {
    //     console.log('error in OAuth fetch:', err);
    //   })
      // .then((token) => {
      //   console.log("TOKEN ISSSSSS: ", token);
        
      // })
  //  const access_token = token.data;
  //  console.log('token:', access_token);
   
})

module.exports = router;