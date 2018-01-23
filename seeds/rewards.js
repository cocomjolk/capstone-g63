
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rewards').del()
    .then(function () {
      // Inserts seed entries
      return knex('rewards').insert([
        { reward_name: 'foam roller',
          reward_points: 100,
          doctor_id: 1,
          reward_comment: '',
          img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516480421/foam_roller_vvtbgu.jpg'
        },
        { reward_name: 'massage',
          reward_points: 700,
          doctor_id: 3,
          reward_comment: '30 min. massage from Happy hands parlor',
          img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516480421/couples-massage-lafusion-massage-and-spa-body-couples-massage_cic6v3.jpg'
        },
        { reward_name: 'Massage Hook',
          reward_points: 300,
          doctor_id: 1,
          reward_comment: '',
          img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516480421/massage_hook_dw3dox.jpg'
        },
        { reward_name: 'Laser Therapy',
          reward_points: 10,
          doctor_id: 2,
          reward_comment: 'Laser therapy in your most painful areas',
          img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516505065/sharks_with_lasers_zynm3d.jpg'
        },
        { reward_name: 'lacrosse ball',
          reward_points: 50,
          doctor_id: 1,
          reward_comment: '',
          img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516480421/lacrosse_ball_nf36co.jpg'
        }

      ]);
    });
};
