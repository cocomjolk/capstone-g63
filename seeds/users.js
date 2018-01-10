
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
          { first_name: 'Susie',
            last_name: 'Cutie',
            password: 'password',
            email: 'michaeldquiroz@gmail.com',
            phone: '5127487651',
            points: '500',
            doctor_id: 1,
            img: 'https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/13707810_10209041618691077_3196789863902341361_n.jpg?oh=caf0a6322563504299f2326ae5dc6975&oe=5AEF9384'
          },
          { first_name: 'John',
            last_name: 'Smith',
            password: 'password',
            email: 'cocomjolk@hotmail.com',
            phone: '5127487651',
            points: '100',
            doctor_id: 2,
            img: 'https://fsmedia.imgix.net/44/13/42/4e/4fbc/410d/8b23/2e0998d75cbd/benedict-cumberbatch-as-doctor-strange-possessing-the-eye-of-agomotto-marvel.jpeg'
          }

      ]);
    });
};
