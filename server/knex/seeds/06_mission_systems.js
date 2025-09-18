/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission_systems').del()
  await knex('mission_systems').insert([
    { system_name: 'SV 1', ops_status: 1, sys_status: 1 },
    { system_name: 'SV 2', ops_status: 1, sys_status: 1 },
    { system_name: 'SV 3', ops_status: 1, sys_status: 1 },
    { system_name: 'SV 4', ops_status: 1, sys_status: 1 },
    { system_name: 'SV 5', ops_status: 1, sys_status: 1 },
    { system_name: 'GBR 1', ops_status: 1, sys_status: 1 },
    { system_name: 'GBR 2', ops_status: 1, sys_status: 1 },
    { system_name: 'GBR 3', ops_status: 1, sys_status: 1 },
    { system_name: 'GBR 4', ops_status: 1, sys_status: 1 },
    { system_name: 'GBR 5', ops_status: 1, sys_status: 1 },
  ]);
};
