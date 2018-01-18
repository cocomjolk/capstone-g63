// USER USER USER USER USER USER USER USER USER USER USER USER
// USER USER USER USER USER USER USER USER USER USER USER USER
// USER USER USER USER USER USER USER USER USER USER USER USER
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/verify', (req,res)=>{
  try {
    let decoded = jwt.verify(req.body.token, "SUPER SECRET")
    // look up id in your db
    let id = decoded.id
    //query db to send doctor info in the response
    knex('users')
    .where({id: id})
    .then( result => {
        console.log('result',result);
        let user = result[0];

        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            img: user.img,
            id: user.id
        })
      })

  } catch(err) {
    res.send('fail')
  }
})

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

//USER GET USER WITH USER ID
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

//USER GET ALL USERS WITH DOCTOR ID
router.get('/doctor_id', (req, res) => {
  console.log(req.query.doctor_id)
  knex('users')
  .where({doctor_id: req.query.doctor_id})
  .then((users) => {
    res.status(200).json(users);
  })
});

//USER GET USER INFORMATION WITH USER EMAIL
router.get('/email', (req, res) => {
  console.log(req.query.email)
  knex('users')
  .where({email: req.query.email})
  //need first() to prevent from returning array
  .first()
  .then((user) => {
    res.status(200).json(user);
  });
});

//USERS EDIT
// router.get('/:id/edit', function(req, res){
//   knex('users')
//   .select('*')
//   .where({id: req.params.id})
//   .first()
//   .then(function(use){
//     res.status(200).json(user);
//     res.render('users/edit', {user:user})
//    })
// });

//USER UPDATE
// router.patch('/:id', function(req, res){
//   knex('users')
//   .update(req.body)
//   .where({id: req.params.id})
//   .returning('*')
//   .then((user) => {
//     res.redirect('/users')
//   })
// })

//USER DESTROY
// router.delete('/:id', function(req, res){
//   knex('users')
//   .select('*')
//   .where(({id: req.params.id}))
//   .first()
//   .del()
//   .then(function(user){
//     res.redirect('/users')
//   })
// })

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
