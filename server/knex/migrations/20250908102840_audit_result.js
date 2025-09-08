'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('audit_result', table => {
    table.increments('result_id'),
    table.string('result_name')
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('audit_result')
};
