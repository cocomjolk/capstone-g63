var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

//USER CREATE RECORD
router.post('/', (req, res) => {
  knex('videos')
  .insert(req.body)
  .returning('*')
  .then((user) => {
    res.status(201).json(user);
  });
})

router.get('/', function(req, res) {
  res.status(200).json({ message: 'videos test' });
});

module.exports = router
