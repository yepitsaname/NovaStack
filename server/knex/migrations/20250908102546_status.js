'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('status', table => {
    table.increments('status_id');
    table.string('status');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('status');
};
