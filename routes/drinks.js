const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Drink = require("../models/Drink");

// @route     GET api/drinks
// @desc      Get all drinks
// @access    Private
router.get('/', (req, res) => {
  res.send('Get all drinks')
});

// @route     POST api/drinks
// @desc      Add new drinks
// @access    Private
router.post('/',  [
  check('name', 'Plase enter a drink name').not().isEmpty(),
  check('brand', 'Please include a brand name').not().isEmpty(),
  check('type', 'Please specify beer / wine / spirit').not().isEmpty(),
  check('abv', 'Please add alcohol by volume').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  const {
    name,
    brand,
    img,
    country,
    region,
    abv,
    type,
    subtype1,
    subtype2
  } = req.body;


  try {

    const drinkFields = {};

    drinkFields.name = name;
    drinkFields.brand = brand;
    drinkFields.abv = abv;
    drinkFields.type = type;

    if(img) drinkFields.img = img;
    if(country) drinkFields.country = country;
    if(region) drinkFields.region = region;
    if(type) drinkFields.type = type;
    if(subtype1) drinkFields.subtype1 = subtype1;
    if(subtype2) drinkFields.subtype2 = subtype2;

    const newDrink = new Drink(drinkFields);

    const drink = await newDrink.save();
    res.json(drink);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/drinks/:id
// @desc      Update drink
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update drink')
  // if(name) drinkFields.name = name;
  // if(brand) drinkFields.brand = brand;
  // if(img) drinkFields.img = img;
  // if(country) drinkFields.country = country;
  // if(region) drinkFields.region = region;
  // if(abv) drinkFields.abv = abv;
  // if(type) drinkFields.type = type;
  // if(subtype1) drinkFields.subtype1 = subtype1;
  // if(subtype2) drinkFields.subtype2 = subtype2;
});

// @route     DELETE api/drinks/:id
// @desc      Delete drink
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete drink')
});


module.exports = router;
