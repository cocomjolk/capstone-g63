// USER USER USER USER USER USER USER USER USER USER USER USER
// USER USER USER USER USER USER USER USER USER USER USER USER
// USER USER USER USER USER USER USER USER USER USER USER USER
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



// USER CREATE RECORD USER CREATE RECORD USER CREATE RECORD USER CREATE RECORD USER CREATE RECORD
router.post('/', (req, res) => {
  // check for duplicate emails eventually
  // hash the password
  bcrypt.hash(req.body.password, 12)
  .then( hashed_pass => {
    console.log(hashed_pass);
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
      //create token, use ID to verify token later
      const token = jwt.sign({ type: "user", id: user.id}, "SUPER SECRET")
      console.log( 'coming from post route');
      console.log(user);
      res.status(201).json({ token: token });
    });
  })
})

// VERIFY USER VERIFY USER VERIFY USER VERIFY USER VERIFY USER VERIFY USER VERIFY USER
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
        console.log('from users.js verify route');
        console.log(user);
        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            doctor_id: user.doctor_id,
            points: user.points,
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


//USER VERIFY PASSWORD WITH USER EMAIL
router.post('/email', (req, res) => {
  //log in terminal
  //console.log(req);
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

// UPDATE USER POINTS UPDATE USER POINTS UPDATE USER POINTS UPDATE USER POINTS
router.put('/points', (req, res) => {
  //log in terminal

  console.log('before insert : ', req.body.points);
  knex('users')
  .update({points: req.body.points})
  //find user by id
  .where({id: req.body.id})
  // .insert({
  //   points: req.body.points
  // })
  //returning points from post for token
  .returning('*')
  .then((user) => {
    console.log('returning from db: ', user[0]);
        res.status(201).json(user[0]);
    })
  })

  // router.post('/', (req, res) => {
  //   // check for duplicate emails eventually
  //   // hash the password
  //   bcrypt.hash(req.body.password, 12)
  //   .then( hashed_pass => {
  //     console.log(hashed_pass);
  //     knex('users')
  //     .insert({
  //       first_name: req.body.first_name,
  //       last_name: req.body.last_name,
  //       password: hashed_pass,
  //       email: req.body.email,
  //       phone: req.body.phone,
  //       points: req.body.points,
  //       doctor_id: req.body.doctor_id,
  //       img: req.body.img
  //     })
  //     //returning doctor id from post for token
  //     .returning('*')
  //     .then((data) => {



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
