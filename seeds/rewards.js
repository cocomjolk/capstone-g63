
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('rewards').insert([
        { reward_name: 'foam roller',
          reward_points: 100,
          img: 'https://images-na.ssl-images-amazon.com/images/I/41BiKdLt98L._SX355_.jpg'
        },
        { reward_name: 'lacrosse ball',
          reward_points: 50,
          img: 'https://www.justhersports.com/media/catalog/product/b/a/ball_yellow.jpg'
        }

      ]);
    });
};
