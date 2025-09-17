"use strict";

exports.up = function (knex, Promise) {
  return knex.schema.createTable("system_status", (table) => {
    table.increments("sys_status_id");
    table.string("sys_status_name");
    table.boolean("ops_cap");
    table.boolean("sys_cap");
    table.string("color");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("system_status");
};
