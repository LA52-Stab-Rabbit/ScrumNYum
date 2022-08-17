const express = require('express');
const router = express.Router();

// import controllers 

// may not need this
router.get('/', (req, res) => {
    console.log('in get route');
    return res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
})

router.get('/redirect', async(req, res) => {
   // console.log('request is: ', req)
   //console.log('response is: ', res);
    const code = req.query;
   //console.log('code ISSSSSSS', code);
    const token = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    console.log('token:', token);
})

module.exports = router;