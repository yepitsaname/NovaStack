'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('history', table => {
    table.increments('history_id');
    table.integer('task');
    table.foreign('task').references('tasks.task_id');
    table.integer('operation');
    table.foreign('operation').references('operations.operation_id');
    table.integer('user');
    table.foreign('user').references('users.user_id');
    table.dateTime('date_time');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('history');
};
