/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("system_status").del();
  await knex("system_status").insert([
    { sys_status_name: "FMC", ops_cap: true, sys_cap: true, color: "green"},
    { sys_status_name: "PMC", ops_cap: true, sys_cap: true, color: "yellow"},
    { sys_status_name: "NMC", ops_cap: true, sys_cap: true, color: "red"},
    { sys_status_name: "ASI", ops_cap: true, sys_cap: true, color: "white"},
    { sys_status_name: "Other", ops_cap: true, sys_cap: true, color: "magenta"},
    { sys_status_name: "Offline", ops_cap: true, sys_cap: true, color: "black"}
  ]);
};
