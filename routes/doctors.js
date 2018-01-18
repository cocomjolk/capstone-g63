// DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES
// DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES
// DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES DOCTOR ROUTES
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// VERIFY TOKEN FOR DOCTOR
router.post('/verify', (req,res)=>{
  try {
    let decoded = jwt.verify(req.body.token, "SUPER SECRET")
    // look up id in your db
    let id = decoded.id
    //query db to send doctor info in the response
    knex('doctors')
    .where({id: id})
    .then( result => {
        console.log('result',result);
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

//DOCTOR CREATE A RECORD
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
          const token = jwt.sign({ type: "doctor", id: doctor.id}, "SUPER SECRET")
          console.log( 'coming from post route');
          //console.log(doctor);
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
  console.log(req.query.id)
  knex('doctors')
  .where({id: req.query.id})
  //need first() to prevent from returning array
  .first()
  .then((doctor) => {
    res.status(200).json(doctor);
  });
});

//USER GET DOCTOR INFORMATION WITH DOCTOR EMAIL
router.get('/email', (req, res) => {
  console.log(req.query)
  knex('doctors')
  .where({email: req.query.email})
  //need first() to prevent from returning array
  .first()
  .then((doctor) => {
    res.status(200).json(doctor);
  });
});

// // DOCTORS EDIT
// router.get('/:id/edit', function(req, res){
//   knex('doctors')
//   .select('*')
//   .where({id: req.params.id})
//   .first()
//   .then(function(doctor){
//     res.render('doctors/edit', {doctor:doctor})
//    })
// });
//
// //  DOCTORS UPDATE
// router.patch('/:id', function(req, res){
//   knex('doctors')
//   .update(req.body)
//   .where({id: req.params.id})
//   .returning('*')
//   .then((doctor) => {
//     res.redirect('/doctors')
//   })
// })
//
// // DOCTORS DESTROY
// router.delete('/:id', function(req, res){
//   knex('doctors')
//   .select('*')
//   .where(({id: req.params.id}))
//   .first()
//   .del()
//   .then(function(doctor){
//     res.redirect('/doctors')
//   })
// })

// // DOCTORS SHOW PAGE
// router.get('/:id', function(req, res) {
//   let doctor = {};
//   knex('doctors')
//   .select('*')
//   //will pass patient ID from object from component page
//   .where({id: req.params.id})
//   .first()
//   .then(function(doctor){
//     doctor = doctor;
//     knex('doctors')
//     .orderBy('price', 'asc')
//     .select('doctors.name', 'donuts.name', 'donuts.price')
//     .where('doctors.name', doctor.name)
//     .innerJoin('doctor_donuts', 'doctor_id', 'doctors.id')
//     .innerJoin('donuts', 'donut_id', 'donuts.id')
//     .then(function (donuts) {
//       doctor.donuts = donuts;
//       //console.log(doctor);
//       res.render('doctors/show', {doctor: doctor})
//     });
//   });
// });

module.exports = router
