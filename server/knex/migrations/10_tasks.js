'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('tasks', table => {
    table.increments('task_id');
    table.string('title');
    table.text('description');
    table.integer('mission_id');
    table.foreign('mission_id').references('mission.mission_id');
    table.integer('status');
    table.foreign('status').references('status.status_id');
    table.datetime('due_date');
    table.integer('assignee');
    table.foreign('assignee').references('users.user_id');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('tasks');
};
