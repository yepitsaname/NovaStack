'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('audit_log', table => {
    table.increments('audit_id'),
      table.integer('user'),
      table.foreign('user').references('users.user_id'),
      table.integer('action'),
      table.foreign('action').references('audit_action.action_id'),
      table.integer('result'),
      table.foreign('result').references('audit_result.result_id'),
      table.timestamp('date_time').defaultTo(knex.fn.now());
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('audit_log')
};
