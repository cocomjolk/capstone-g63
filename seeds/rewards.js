
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('rewards').insert([
        { reward_name: 'foam roller',
          reward_points: 100,
          doctor_id: 1,
          img: 'https://images-na.ssl-images-amazon.com/images/I/41BiKdLt98L._SX355_.jpg'
        },
        { reward_name: 'massage',
          reward_points: 600,
          doctor_id: 1,
          img: 'https://img.grouponcdn.com/deal/kdvEDEU5ceVCQMqQCgrh/Fw-2048x1242/v1/c700x420.jpg'
        },
        { reward_name: 'lacrosse ball',
          reward_points: 50,
          doctor_id: 2,
          img: 'https://www.justhersports.com/media/catalog/product/b/a/ball_yellow.jpg'
        }

      ]);
    });
};
