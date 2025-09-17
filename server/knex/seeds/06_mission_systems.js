/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission_systems').del()
  await knex('mission_systems').insert([
    { system_name: 'test system1', status: 3 },
    { system_name: 'test system2', status: 3 },
    { system_name: 'test system3', status: 3 }
  ]);
};
