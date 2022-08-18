const express = require('express');
const router = express.Router();
const axios = require('axios'); //axios required for post request; fetch only available to backend on most recent version of node and requires additional setup

// import controllers 
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js');

router.get('/', (req, res) => {
    console.log('in get route');
    const scope = 'read:user%20user:email%20public_repo';
    return res.status(200).redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=${scope}`);
})

router.get('/redirect', userController.handleGithubRedirect, userController.checkGithubUser, (req, res) => {
   // console.log('request is: ', req)
   //console.log('response is: ', res);
   // redirect the user to their scrum page 
   res.redirect('/scrum');
})

module.exports = router;