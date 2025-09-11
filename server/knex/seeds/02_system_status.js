/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("system_status").del();
  await knex("system_status").insert([
    { system_name: "system1", system_status: "Critical", capabilities_available: 0, op_capabilities_available: 51 },
    { system_name: "system2", system_status: "Warning", capabilities_available: 51, op_capabilities_available: 51 },
    { system_name: "system3", system_status: "Healthy", capabilities_available: 76, op_capabilities_available: 76 },
    { system_name: "AstroGlide", system_status: "Healthy", capabilities_available: 76, op_capabilities_available: 76 }
  ]);
};
