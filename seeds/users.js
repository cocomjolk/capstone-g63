
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
          { first_name: 'Susie',
            last_name: 'Cutie',
            password: '$2a$12$3lt1wtvQW6Ag57YYRxy92OMVULrbombewZIBynFYR7BoT9MQ1CEku',
            email: 'susie@gmail.com',
            phone: '5127487651',
            points: '500',
            doctor_id: 1,
            img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516479031/susie_wrrs7x.jpg'
          },
          { first_name: 'Darth',
            last_name: 'Vader',
            password: '$2a$12$uQYa5YDyZMArRNPpQmaG9.YUWwO4YFfIZL/6X5DYLcKxOGvsMF3Cu',
            email: 'darth@gmail.com',
            phone: '5127487651',
            points: '100',
            doctor_id: 2,
            img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516505883/Darth-Vader_m3c3jd.jpg'
          },
          { first_name: 'Robocop',
            last_name: 'Murphey',
            password: '$2a$12$uQYa5YDyZMArRNPpQmaG9.YUWwO4YFfIZL/6X5DYLcKxOGvsMF3Cu',
            email: 'robocop@gmail.com',
            phone: '5127487651',
            points: '200',
            doctor_id: 1,
            img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516477271/RoboCop_a7xfma.jpg'
          },
          { first_name: 'Michael',
            last_name: 'Quiroz',
            password: '$2a$12$uQYa5YDyZMArRNPpQmaG9.YUWwO4YFfIZL/6X5DYLcKxOGvsMF3Cu',
            email: 'cocomjolk@hotmail.com',
            phone: '5127487651',
            points: '20',
            doctor_id: 2,
            img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516604368/mike_kiik2k.jpg'
          },
          { first_name: 'Harry',
            last_name: 'Henderson',
            password: '$2a$12$uQYa5YDyZMArRNPpQmaG9.YUWwO4YFfIZL/6X5DYLcKxOGvsMF3Cu',
            email: 'harry@gmail.com',
            phone: '5127487651',
            points: '10',
            doctor_id: 3,
            img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516477264/harry-henderson_itl3kc.jpg'
          }

      ]);
    });
};
