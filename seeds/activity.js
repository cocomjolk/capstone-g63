
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activity').del()
    .then(function () {
      // Inserts seed entries
      return knex('activity').insert([
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '1',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516698296/yoga-strap-stretch_dfu14i.jpg'
          },
          { activity_action: 'Post',
            activity_name: 'Photo',
            user_id: '4',
            doctor_id: '1',
            activity_points: 5,
            redeemed: false,
            activity_img: 'https://res.cloudinary.com/hxf6ors9y/image/upload/v1516677724/qedwqpntvqwidrkpoguq.jpg'
          },
          { activity_action: 'Redeemed',
            activity_name: 'foam roller',
            user_id: '4',
            doctor_id: '1',
            activity_points: 100,
            redeemed: true,
            activity_img: 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516480421/foam_roller_vvtbgu.jpg'
          }

      ]);
    });
};
