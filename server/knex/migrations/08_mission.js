"use strict";

exports.up = function (knex, Promise) {
  return knex.schema.createTable("mission", (table) => {
    table.increments("mission_id");
    table.string("mission_name");
    table.integer("systems"); //array
    table.foreign("systems").references("system_status.system_id");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("mission");
};
