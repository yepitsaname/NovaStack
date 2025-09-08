'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('operations', table => {
    table.increments('operation_id');
    table.string('operation_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('operations')
};
