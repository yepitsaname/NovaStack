/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission_systems').del()
  await knex('mission_systems').insert([
    { system_name: 'test system', status: 3 },
  ]);
};
