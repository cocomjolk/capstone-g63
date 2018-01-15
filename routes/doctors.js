var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

//DOCTOR CREATE A RECORD
router.post('/', (req, res) => {
  knex('doctors')
  .insert(req.body)
  .returning('*')
  .then((doctor) => {
    res.status(201).json(doctor);
  });
})

//DOCTOR GET ALL RECORDS
router.get('/', (req, res) => {
  knex('doctors')
  .select('*')
  .then((doctors) => {
    res.status(200).json(doctors);
  })
});

//USER GET USER INFORMATION WITH USER EMAIL
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
