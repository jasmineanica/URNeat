const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../middleware/auth');
const Drink = require("../models/Drink");
const User = require("../models/User");

// @route     GET api/drinks
// @desc      Get all drinks
// @access res.send('Update drink')   Public
router.get('/', async(req, res) => {
  try {
    let drinks = await Drink.find({});
    res.json(drinks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/drinks/beer
// @desc      Get all drinks
// @access res.send('Update drink')   Public
router.get('/beer', async(req, res) => {
  try {
    let drinks = await Drink.find({ type: "Beer" });
    res.json(drinks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route     GET api/drinks/beer
// @desc      Get all drinks
// @access res.send('Update drink')   Public
router.get('/wine', async(req, res) => {
  try {
    let drinks = await Drink.find({ type: "Wine" });
    res.json(drinks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/drinks/beer
// @desc      Get all drinks
// @access res.send('Update drink')   Public
router.get('/spirits', async(req, res) => {
  try {
    let drinks = await Drink.find({ type: "Spirits" });
    res.json(drinks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route     POST api/drinks
// @desc      Add new drinks
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Plase enter a drink name').not().isEmpty(),
      check('brand', 'Please include a brand name').not().isEmpty(),
      check('type', 'Please specify beer / wine / spirit').not().isEmpty(),
      check('abv', 'Please add alcohol by volume').not().isEmpty()
    ]
  ],
  async (req, res) => {
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

      let user = await User.findById(req.user.id);

      // Need to check it belongs to Miguel
      if (user.username !== "SadBoi") {
        return res.status(401).json({ msg: "Not authorized" });
      }

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
  }
);

// @route     PUT api/drinks/:id
// @desc      Update drink
// @access    Private
router.put(
  '/:id',
  auth,
  async (req, res) => {

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

    const drinkFields = {}

    if(name) drinkFields.name = name;
    if(brand) drinkFields.brand = brand;
    if(abv) drinkFields.abv = abv;
    if(type) drinkFields.type = type;
    if(img) drinkFields.img = img;
    if(country) drinkFields.country = country;
    if(region) drinkFields.region = region;
    if(subtype1) drinkFields.subtype1 = subtype1;
    if(subtype2) drinkFields.subtype2 = subtype2;

    try {
      let user = await User.findById(req.user.id);

      // Need to check it belongs to Miguel
      if (user.username !== "SadBoi") {
        return res.status(401).json({ msg: "Not authorized" });
      }

      let drink = await Drink.findById(req.params.id);
      if(!drink) return res.status(404).json({ msg: 'Drink not found' });

      drink = await Drink.findByIdAndUpdate(req.params.id,
        { $set: drinkFields }, { new: true });

      res.json(drink);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

});

// @route     DELETE api/drinks/:id
// @desc      Delete drink
// @access    Private
router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      let drink = await Drink.findById(req.params.id);
      if(!drink) return res.status(404).json({ msg: 'Drink not found' });

      drink = await Drink.findByIdAndDelete(req.params.id);
      res.json(drink);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

});


module.exports = router;
