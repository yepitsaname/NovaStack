/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('history').del()
  await knex('history').insert([
    { task: 1, operation: 1, user: 1 },
  ]);
};
