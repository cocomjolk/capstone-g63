
exports.up = function(knex, Promise) {
  return knex.schema.createTable('activity', (table)=>{
    table.increments();
    table.string('activity_name');
    table.string('user_id');
    table.string('doctor_id');
    table.integer('activity_points');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activity');
};
