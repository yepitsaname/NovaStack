/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reports", table => {
    table.increments("report_id"),
      table.integer("user_id"),
      table.foreign("user_id").references("users.user_id"),
      table.integer("system"),
      table.foreign("system").references("mission_systems.system_id"),
      table.string("title"),
      table.string("classification"),
      table.string("opscap"),
      table.string("syscap"),
      table.string("short_description"),
      table.text("long_description"),
      table.dateTime("start"),
      table.dateTime("stop"),
      table.text("impact"),
      table.text("fix_action"),
      table.text("cause")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reports");
};
