var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

//DOCTOR CREATE RECORD
router.post('/', (req, res) => {
  knex('doctors')
  .insert(req.body)
  .returning('*')
  .then((user) => {
    res.status(201).json(user);
  });
})

router.get('/', function(req, res) {
  res.status(200).json({ message: 'doctors test' });
});

module.exports = router
