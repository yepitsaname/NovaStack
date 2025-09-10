'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id');
    table.string('username');
    table.string('email');
    table.text('password');
    table.string('first_name');
    table.string('last_name');
    table.jsonb('preferences').defaultTo('{}');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
