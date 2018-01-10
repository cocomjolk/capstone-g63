
exports.up = function(knex, Promise) {
  return knex.schema.createTable('doctors', (table)=>{
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('password');
    table.string('email');
    table.string('phone');
    table.string('location');
    table.string('img');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('doctors');
};
