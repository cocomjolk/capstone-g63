
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activity', (table)=>{
    table.increments();
    table.string('activity_action');
    table.string('activity_name');
    table.string('user_id');
    table.string('doctor_id');
    table.integer('activity_points');
    table.boolean('redeemed');
    table.string('activity_img');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activity');
};
