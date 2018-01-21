
exports.up = function(knex, Promise) {
  return knex.schema.createTable('redeemed', (table)=>{
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('user_id');
    table.string('doctor_id');
    table.string('reward_id');
    table.string('img');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('redeemed');
};
