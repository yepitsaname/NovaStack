"use strict";

exports.up = function (knex, Promise) {
  return knex.schema.createTable("system_status", (table) => {
    table.increments("status_id");
    table.string("status_name");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("system_status");
};
