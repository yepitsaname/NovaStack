/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("mission_systems", (table) => {
    table.increments("system_id");
    table.string("system_name");
    table.integer("ops_status");
    table.foreign("ops_status").references("system_status.sys_status_id")
    table.integer("sys_status");
    table.foreign("sys_status").references("system_status.sys_status_id")
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mission_systems')
};
