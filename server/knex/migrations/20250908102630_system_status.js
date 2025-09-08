"use strict";

exports.up = function (knex, Promise) {
  return knex.schema.createTable("system_status", (table) => {
    table.increments("system_id");
    table.string("system_name");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("system_status");
};
