
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rewards', (table)=>{
    table.increments();
    table.string('reward_name');
    table.integer('reward_points');
    table.string("doctor_id")
    table.string('img');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rewards');
};
