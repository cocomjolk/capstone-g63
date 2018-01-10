
exports.up = function(knex, Promise) {
  return knex.schema.createTable('videos', (table)=>{
    table.increments();
    table.string('user_id');
    table.string('video_title');
    table.string('video_comments');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('videos');
};
