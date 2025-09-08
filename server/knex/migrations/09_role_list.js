"use strict";

exports.up = function (knex, Promise) {
  return knex.schema.createTable("role_list", (table) => {
    table.increments("role_id");
    table.integer("user");
    table.foreign("user").references("users.user_id");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("role_list");
};
