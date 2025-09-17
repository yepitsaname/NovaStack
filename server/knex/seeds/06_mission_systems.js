/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission_systems').del()
  await knex('mission_systems').insert([
    { system_name: 'sv 1', status: 1 },
    { system_name: 'sv 2', status: 1 },
    { system_name: 'sv 3', status: 1 },
    { system_name: 'sv bus', status: 1 },
    { system_name: 'sv payload', status: 1 },
    { system_name: 'radar 1', status: 1 },
    { system_name: 'radar 2', status: 1 },
    { system_name: 'radar 3', status: 1 },
    { system_name: 'radar watch', status: 1 },
    { system_name: 'radar ', status: 1 },
  ]);
};
