
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
          { first_name: 'Susie',
            last_name: 'Cutie',
            password: 'password1',
            email: 'susie@gmail.com',
            phone: '5127487651',
            points: '500',
            doctor_id: 3,
            img: 'https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/13707810_10209041618691077_3196789863902341361_n.jpg?oh=caf0a6322563504299f2326ae5dc6975&oe=5AEF9384'
          },
          { first_name: 'Darth',
            last_name: 'Vader',
            password: 'password2',
            email: 'darth@gmail.com',
            phone: '5127487651',
            points: '100',
            doctor_id: 2,
            img: 'http://cdn-static.denofgeek.com/sites/denofgeek/files/2018/01/vader-main.jpg'
          },
          { first_name: 'Robocop',
            last_name: 'Murphey',
            password: 'password3',
            email: 'robocop@gmail.com',
            phone: '5127487651',
            points: '10000',
            doctor_id: 1,
            img: 'https://cdn.pastemagazine.com/www/articles/RoboCop%20Poster%20Main.jpg'
          },
          { first_name: 'Michael',
            last_name: 'Quiroz',
            password: 'password4',
            email: 'cocomjolk@hotmail.com',
            phone: '5127487651',
            points: '10000',
            doctor_id: 2,
            img: 'https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/16194894_10153989588431580_8147888634389679382_n.jpg?oh=b47a48a82b32b7e1a23a56127a4d8366&oe=5AED2726'
          },
          { first_name: 'Harry',
            last_name: 'Henderson',
            password: 'password5',
            email: 'harry@gmail.com',
            phone: '5127487651',
            points: '10',
            doctor_id: 1,
            img: 'https://memegenerator.net/img/images/600x600/15088116/harry-henderson.jpg'
          }

      ]);
    });
};
