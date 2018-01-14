
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('doctors').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors').insert([
        { first_name: 'Alex',
          last_name: 'Rios',
          password: 'password',
          email: 'michaeldquiroz@gmail.com',
          phone: '5127487651',
          location: 'Austin',
          img: 'https://s3-media3.fl.yelpcdn.com/bphoto/c-mJLLC5VOCRWxjZllP7Mw/ls.jpg'
        },
        { first_name: 'Dr.',
          last_name: 'Strange',
          password: 'password',
          email: 'cocomjolk@hotmail.com',
          phone: '5127487651',
          location: 'Space',
          img: 'https://fsmedia.imgix.net/44/13/42/4e/4fbc/410d/8b23/2e0998d75cbd/benedict-cumberbatch-as-doctor-strange-possessing-the-eye-of-agomotto-marvel.jpeg'
        }

      ]);
    });
};
