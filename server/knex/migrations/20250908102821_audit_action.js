'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('audit_action', table => {
    table.increments('action_id'),
    table.string('action_name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('audit_action')
};
