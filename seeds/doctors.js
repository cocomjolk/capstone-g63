
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('doctors').del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors').insert([
        { first_name: 'Alex',
          last_name: 'Rios',
          password: '$2a$12$3lt1wtvQW6Ag57YYRxy92OMVULrbombewZIBynFYR7BoT9MQ1CEku',
          email: 'rios@gmail.com',
          phone: '5127487651',
          location: 'Austin',
          img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516477463/drRios2_tnzm0f.png'
        },
        { first_name: 'Dougie',
          last_name: 'Evil',
          password: '$2a$12$3lt1wtvQW6Ag57YYRxy92OMVULrbombewZIBynFYR7BoT9MQ1CEku',
          email: 'evil@gmail.com',
          phone: '5127487651',
          location: 'A Freakin Volcanoe',
          img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516477257/drEvil_geg7ow.jpg'
        },
        { first_name: 'Stephen',
          last_name: 'Strangelove',
          password: '$2a$12$3lt1wtvQW6Ag57YYRxy92OMVULrbombewZIBynFYR7BoT9MQ1CEku',
          email: 'strangelove@hotmail.com',
          phone: '5127487651',
          location: 'Houston',
          img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516477728/strangelove_jdlhir.jpg'
        }

      ]);
    });
};
