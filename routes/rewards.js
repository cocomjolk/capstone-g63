const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// REWARDS CREATE RECORD
router.post('/', (req, res) => {
  knex('rewards')
  .insert(req.body)
  .returning('*')
  .then((reward) => {
    res.status(201).json(reward);
  });
})

// REWARDS GET ALL REWARDS WITH DOCTOR ID:
router.get('/', (req, res) => {
  // console.log(req.query.doctor_id)
  knex('rewards')
  .where({doctor_id: req.query.doctor_id})
  .then((rewards) => {
    res.status(200).json(rewards);
  })
});

// REWARDS DESTROY
router.delete('/delete', function(req, res){
  knex('rewards')
  .select('*')
  .where(({id: req.query.id}))
  .first()
  .del()
  .then(function(reward){
    res.status(200).json(reward);
  })
})

// REWARDS UPDATE
// router.patch('/:id', function(req, res){
//   knex('rewards')
//   .update(req.body)
//   .where({id: req.params.id})
//   .returning('*')
//   .then((reward) => {
//     res.redirect('/rewards')
//   })
// })



module.exports = router
