
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('rewards').insert([
        { reward_name: 'foam roller',
          reward_points: 100,
          doctor_id: 1,
          img: 'https://www.bentonbetter.com/wp-content/uploads/2016/05/Roller.png'
        },
        { reward_name: 'massage',
          reward_points: 600,
          doctor_id: 1,
          img: 'https://magnoliahotels.com/dallas-downtown/wp-content/uploads/sites/2/2017/10/11-3-1.jpg'
        },
        { reward_name: 'lacrosse ball',
          reward_points: 50,
          doctor_id: 2,
          img: 'https://www.justhersports.com/media/catalog/product/b/a/ball_yellow.jpg'
        }

      ]);
    });
};
