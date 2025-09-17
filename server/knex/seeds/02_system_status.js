/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("system_status").del();
  await knex("system_status").insert([
    { sys_status_name: "full mission capable", ops_cap: true, sys_cap: true, color: "green"},
    { sys_status_name: "partial mission capable", ops_cap: true, sys_cap: true, color: "yellow"},
    { sys_status_name: "non-mission capable", ops_cap: true, sys_cap: true, color: "red"},
    { sys_status_name: "asi", ops_cap: true, sys_cap: true, color: "white"},
    { sys_status_name: "other", ops_cap: true, sys_cap: true, color: "magenta"},
    { sys_status_name: "offline", ops_cap: true, sys_cap: true, color: "black"}
  ]);
};
