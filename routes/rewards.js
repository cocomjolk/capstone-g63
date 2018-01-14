var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

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
  console.log(req.query.doctor_id)
  knex('rewards')
  .where({doctor_id: req.query.doctor_id})
  .then((rewards) => {
    res.status(200).json(rewards);
  })
});

// REWARDS EDIT
router.get('/:id/edit', function(req, res){
  knex('rewards')
  .select('*')
  .where({id: req.params.id})
  .first()
  .then(function(reward){
    res.render('rewards/edit', {reward:reward})
   })
});

// REWARDS UPDATE
router.patch('/:id', function(req, res){
  knex('rewards')
  .update(req.body)
  .where({id: req.params.id})
  .returning('*')
  .then((reward) => {
    res.redirect('/rewards')
  })
})

// REWARDS DESTROY
router.delete('/:id', function(req, res){
  knex('rewards')
  .select('*')
  .where(({id: req.params.id}))
  .first()
  .del()
  .then(function(reward){
    res.redirect('/rewards')
  })
})

// // REWARDS SHOW PAGE
// router.get('/:id', function(req, res) {
//   let reward = {};
//   knex('rewards')
//   .select('*')
//   //will pass patient ID from object from component page
//   .where({id: req.params.id})
//   .first()
//   .then(function(reward){
//     reward = reward;
//     knex('rewards')
//     .orderBy('price', 'asc')
//     .select('rewards.name', 'donuts.name', 'donuts.price')
//     .where('rewards.name', reward.name)
//     .innerJoin('reward_donuts', 'reward_id', 'rewards.id')
//     .innerJoin('donuts', 'donut_id', 'donuts.id')
//     .then(function (donuts) {
//       reward.donuts = donuts;
//       //console.log(reward);
//       res.render('rewards/show', {reward: reward})
//     });
//   });
// });

module.exports = router
