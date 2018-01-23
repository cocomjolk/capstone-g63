// ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY
// ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY
// ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY ACTIVITY
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');



// POST REDEEM ACTIVITY FROM USER POST REDEEM ACTIVITY FROM USER POST ACTIVITY FROM USER
router.post('/redeem', (req, res) => {
    knex('activity')
    .insert({
      redeemed: true,
      user_id: req.body.user_id,
      doctor_id: req.body.doctor_id,
      activity_name: req.body.activity_name,
      activity_action: req.body.activity_action,
      activity_points: req.body.activity_points
    })
    .returning('*')
    .then((data) => {
      let activity = data[0];
      console.log( 'coming from post route');
      console.log(activity);
      res.status(201).json(activity);
    });
  })

// POST PHOTO ACTIVITY FROM USER POST PHOTO ACTIVITY FROM USER POST ACTIVITY FROM USER
router.post('/upload', (req, res) => {
    console.log('req.body from upload route:', req.body);
    knex('activity')
    .insert({
      redeemed: false,
      user_id: req.body.user_id,
      doctor_id: req.body.doctor_id,
      activity_img: req.body.activity_img,
      activity_name: req.body.activity_name,
      activity_action: req.body.activity_action,
      activity_points: req.body.activity_points,

    })
    .returning('*')
    .then((data) => {
      let activity = data[0];
      console.log( 'coming from post route');
      console.log(activity);
      res.status(201).json(activity);
    });
  })

// GET ALL ACTIVITY WITH USER ID:
router.get('/', (req, res) => {
  knex('activity')
  .where({user_id: req.query.user_id})
  .then((activity) => {
    console.log('user activity from route',activity)
    res.status(200).json(activity);
  })
});


module.exports = router
