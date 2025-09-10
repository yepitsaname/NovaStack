/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("system_status").del();
  await knex("system_status").insert([
    { status_name: "Critical" },
    { status_name: "Warning" },
    { status_name: "Operational" }
  ]);
};
