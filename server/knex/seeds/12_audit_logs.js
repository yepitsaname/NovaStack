/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('audit_log').del()
  await knex('audit_log').insert([
    { user: 1, action: 1, result: 1 },
  ]);
};