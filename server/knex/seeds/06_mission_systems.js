/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission_systems').del()
  await knex('mission_systems').insert([
    { system_name: 'sv 1', ops_status: 1, sys_status: 1 },
    { system_name: 'sv 2', ops_status: 1, sys_status: 1 },
    { system_name: 'sv 3', ops_status: 1, sys_status: 1 },
    { system_name: 'sv bus', ops_status: 1, sys_status: 1 },
    { system_name: 'sv payload', ops_status: 1, sys_status: 1 },
    { system_name: 'radar 1', ops_status: 1, sys_status: 1 },
    { system_name: 'radar 2', ops_status: 1, sys_status: 1 },
    { system_name: 'radar 3', ops_status: 1, sys_status: 1 },
    { system_name: 'radar watch', ops_status: 1, sys_status: 1 },
    { system_name: 'radar ', ops_status: 1, sys_status: 1 },
  ]);
};
