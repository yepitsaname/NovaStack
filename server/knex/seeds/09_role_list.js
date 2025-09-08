/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('role_list').del()
  await knex('role_list').insert([
    { user: 1, role: 1 },
  ]);
};
