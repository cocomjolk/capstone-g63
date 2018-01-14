var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
// USER USER USER USER USER USER USER USER USER USER USER USER
// USER USER USER USER USER USER USER USER USER USER USER USER
// USER USER USER USER USER USER USER USER USER USER USER USER


// USER CREATE RECORD
router.post('/', (req, res) => {
  knex('users')
  .insert(req.body)
  .returning('*')
  .then((user) => {
    res.status(201).json(user);
  });
})

// USERS GET ALL
router.get('/', (req, res) => {
  knex('users')
  // .select('*')
  .then((users) => {
    res.status(200).json(users);
  })
});

//USER GET USER INFORMATION WITH USER ID
router.get('/id', (req, res) => {
  console.log(req.query.id)
  knex('users')
  .where({id: req.query.id})
  //need first() to prevent from returning array
  .first()
  .then((user) => {
    res.status(200).json(user);
  });
});


//USERS EDIT
router.get('/:id/edit', function(req, res){
  knex('users')
  .select('*')
  .where({id: req.params.id})
  .first()
  .then(function(use){
    res.status(200).json(user);
    res.render('users/edit', {user:user})
   })
});

//USER UPDATE
router.patch('/:id', function(req, res){
  knex('users')
  .update(req.body)
  .where({id: req.params.id})
  .returning('*')
  .then((user) => {
    res.redirect('/users')
  })
})

//USER DESTROY
router.delete('/:id', function(req, res){
  knex('users')
  .select('*')
  .where(({id: req.params.id}))
  .first()
  .del()
  .then(function(user){
    res.redirect('/users')
  })
})

// //USER SHOW PAGE
// router.get('/:id', function(req, res) {
//   let user = {};
//   knex('users')
//   .select('*')
//   //will pass patient ID from object from component page
//   .where({id: req.params.id})
//   .first()
//   .then(function(user){
//     user = user;
//     knex('users')
//     .orderBy('price', 'asc')
//     .select('users.name', 'donuts.name', 'donuts.price')
//     .where('users.name', user.name)
//     .innerJoin('user_donuts', 'user_id', 'users.id')
//     .innerJoin('donuts', 'donut_id', 'donuts.id')
//     .then(function (donuts) {
//       user.donuts = donuts;
//       //console.log(user);
//       res.render('users/show', {user: user})
//     });
//   });
// });

module.exports = router
