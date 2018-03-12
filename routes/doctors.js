// DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES
// DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES
// DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRETKEY = require('dotenv').config().parsed.secretkey;

//DOCTOR CREATE A RECORD DOCTOR CREATE A RECORD DOCTOR CREATE A RECORD DOCTOR CREATE A RECORD
router.post('/', (req, res) => {
  // check for duplicate emails first
  // hash the password
  bcrypt.hash(req.body.password, 12)
  .then( hashed_pass => {
    knex('doctors')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hashed_pass,
      email: req.body.email,
      phone: req.body.phone,
      img: req.body.img
    })
    //returning doctor id from post for token
    .returning('*')
    .then((data) => {
      // create a token and send it
      let doctor = data[0];
      //Use doctor ID to verify token later
      const token = jwt.sign({ type: "doctor", id: doctor.id}, SECRETKEY)
      res.status(201).json({
        id: doctor.id,
        email: doctor.email,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        phone: doctor.phone,
        img: doctor.img,
        token: token
      });
    });
  })
})

// VERIFY TOKEN FOR DOCTOR VERIFY TOKEN FOR DOCTOR VERIFY TOKEN FOR DOCTOR VERIFY TOKEN FOR DOCTOR
router.post('/verify', (req,res)=>{
  try {
    let decoded = jwt.verify(req.body.token, SECRETKEY)
    // look up id in your db
    let id = decoded.id
    //query db to send doctor info in the response
    knex('doctors')
    .where({id: id})
    .then( result => {
        let doctor = result[0];

        res.json({
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            email: doctor.email,
            phone: doctor.phone,
            img: doctor.img,
            id: doctor.id
        })
      })

  } catch(err) {
    res.send('fail')
  }
})


//USER VERIFY PASSWORD WITH EMAIL
router.post('/email', (req, res) => {
  knex('doctors')
  .where({email: req.body.email})
  //need first() to prevent from returning array
  .first()
  //user info passed to .then
  .then((user) => {
    console.log('user from db:', user);
    bcrypt.compare(req.body.password, user.password)
    .then(function(result) {
      if (result == true){
        console.log('passwords match');
        const token = jwt.sign({ type: "user", id: user.id}, SECRETKEY)
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

//DOCTOR GET ALL RECORDS
router.get('/', (req, res) => {
  knex('doctors')
  .select('*')
  .then((doctors) => {
    res.status(200).json(doctors);
  })
});

//DOCTOR GET DOCTOR INFORMATION WITH DOCTOR_ID
router.get('/id', (req, res) => {
  // console.log(req.query.id)
  knex('doctors')
  .where({id: req.query.id})
  //need first() to prevent from returning array
  .first()
  .then((doctor) => {
    res.status(200).json(doctor);
  });
});

//USER GET ALL USERS WITH DOCTOR ID
router.get('/doctor_id', (req, res) => {
  // console.log(req.query.doctor_id)
  knex('users')
  .where({doctor_id: req.query.doctor_id})
  .then((users) => {
    res.status(200).json(users);
  })
});


module.exports = router
