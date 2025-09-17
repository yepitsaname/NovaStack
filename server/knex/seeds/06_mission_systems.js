/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission_systems').del()
  await knex('mission_systems').insert([
    { system_name: 'sv 1', status: 0 },
    { system_name: 'sv 2', status: 0 },
    { system_name: 'sv 3', status: 0 },
    { system_name: 'sv 4', status: 0 },
    { system_name: 'sv 5', status: 0 },
    { system_name: 'radar 1', status: 0 },
    { system_name: 'radar 2', status: 0 },
    { system_name: 'radar 3', status: 0 },
    { system_name: 'radar 4', status: 0 },
    { system_name: 'radar 5', status: 0 },
  ]);
};
