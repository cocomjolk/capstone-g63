// USER USER USER USER USER USER USER USER USER USER USER USER
// USER USER USER USER USER USER USER USER USER USER USER USER
// USER USER USER USER USER USER USER USER USER USER USER USER
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// VERIFY USER
router.post('/verify', (req,res)=>{
  try {
    let decoded = jwt.verify(req.body.token, "SUPER SECRET")
    // look up id in your db
    let id = decoded.id
    //query db to send user info in the response
    knex('users')
    .where({id: id})
    .then( result => {
        let user = result[0];

        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            doctor_id: user.doctor_id,
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

// VERIFY PASSWORD
// router.post('/password', (req,res)=>{
//   try {
//
//     bcrypt.hash(req.body.password, 12)
//         .then( hashed_pass => {
//     let decoded = jwt.verify(req.body.token, "SUPER SECRET")
//     // look up id in your db
//     let id = decoded.id
//     //query db to send user info in the response
//     knex('users')
//     .where({id: id})
//     .then( result => {
//         let user = result[0];
//
//         res.json({
//             first_name: user.first_name,
//             last_name: user.last_name,
//             doctor_id: user.doctor_id,
//             email: user.email,
//             phone: user.phone,
//             img: user.img,
//             id: user.id
//         })
//       })
//
//   } catch(err) {
//     res.send('fail')
//   }
// })

// USER CREATE RECORD
router.post('/', (req, res) => {
  // check for duplicate emails first
  // hash the password
  bcrypt.hash(req.body.password, 12)
      .then( hashed_pass => {
        knex('users')
        .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashed_pass,
            email: req.body.email,
            phone: req.body.phone,
            points: req.body.points,
            doctor_id: req.body.doctor_id,
            img: req.body.img
        })
        //returning doctor id from post for token
        .returning('*')
        .then((data) => {
          // create a token and send it
          let user = data[0];
          //Use doctor ID to verify token later
          const token = jwt.sign({ type: "user", id: user.id}, "SUPER SECRET")
          console.log( 'coming from post route');
          //console.log(doctor);
          res.status(201).json({
            id: user.id,
            first_name: user.first_name,
            phone: user.phone,
            points: user.points,
            img: user.img,
            token: token
          });
        });
      })
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

//USER VERIFY PASSWORD WITH USER EMAIL
router.post('/email', (req, res) => {
  //log in terminal
  //get email from login.js
  knex('users')
  //find user by email
  .where({email: req.body.email})
  //need first() to prevent from returning array
  .first()
  //user info passed to .then
  .then((user) => {
    bcrypt.compare(req.body.password, user.password)
    .then(function(result) {
      if (result == true){
        console.log('passwords match');
        const token = jwt.sign({ type: "user", id: user.id}, "SUPER SECRET")
        res.status(201).json({
          id: user.id,
          first_name: user.first_name,
          points: user.points,
          img: user.img,
          token: token
        });
      } else {
        console.log('failed');
        res.send('fail')
      }
    })
  })
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
