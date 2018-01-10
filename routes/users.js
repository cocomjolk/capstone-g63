var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

//USER CREATE RECORD
router.post('/', (req, res) => {
  knex('users')
  .insert(req.body)
  .returning('*')
  .then((user) => {
    res.status(201).json(user);
  });
})

router.get('/', function(req, res) {
  res.status(200).json({ message: 'rawr! you did it!' });
});

module.exports = router

// [{"key":"first_name","value":"Susie","description":""},{"key":"last_name","value":"Q","description":""},{"key":"email","value":"michaeldquiroz@gmail.com","description":""},{"key":"phone","value":"5127487651","description":""},{"key":"image","value":"https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/13707810_10209041618691077_3196789863902341361_n.jpg?oh=caf0a6322563504299f2326ae5dc6975&oe=5AEF9384","description":""},{"key":"points","value":"500","description":""},{"key":"password","value":"password","description":""}]
