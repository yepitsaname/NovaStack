'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('role_name', table => {
    table.increments('role_name_id');
    table.string('role_name');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('role_name');
};
