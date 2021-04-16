const express = require('express');
const router = express.Router();

// @route     GET api/auth
// @desc      Get loggin in user
// @access    Private
router.get('/', (req, res) => {
  res.send('Get signed in user')
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post('/', (req, res) => {
  res.send('Sign in user')
});

module.exports = router;
