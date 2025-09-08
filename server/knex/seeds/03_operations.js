/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("operations").del();
  await knex("operations").insert([{ operation_name: "operation_name" }]);
};
