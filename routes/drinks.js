const express = require('express');
const router = express.Router();

// @route     GET api/drinks
// @desc      Get all drinks
// @access    Private
router.get('/', (req, res) => {
  res.send('Get all drinks')
});

// @route     POST api/drinks
// @desc      Add new drinks
// @access    Private
router.post('/', (req, res) => {
  res.send('Add drink')
});

// @route     PUT api/drinks/:id
// @desc      Update drink
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update drink')
});

// @route     DELETE api/drinks/:id
// @desc      Delete drink
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete drink')
});


module.exports = router;
