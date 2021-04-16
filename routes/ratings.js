const express = require('express');
const router = express.Router();

// @route     GET api/ratings
// @desc      Get all users ratings
// @access    Private
router.get('/', (req, res) => {
  res.send('Get all ratings')
});

// @route     POST api/ratings
// @desc      Add new ratings
// @access    Private
router.post('/', (req, res) => {
  res.send('Add ratings')
});

// @route     PUT api/ratings/:id
// @desc      Update rating
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update rating')
});

// @route     DELETE api/rating/:id
// @desc      Delete rating
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete rating')
});


module.exports = router;
