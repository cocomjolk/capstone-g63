
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('videos').del()
    .then(function () {
      // Inserts seed entries
      return knex('videos').insert([
        { user_id: 1,
          video_title: 'leg up',
          video_comments: 'felt great!'}
      ]);
    });
};
