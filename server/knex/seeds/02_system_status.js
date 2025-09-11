/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("system_status").del();
  await knex("system_status").insert([
    { system_name: "system1", system_status: "Critical", capabilities_available: "Healthy", op_capabilities_available: "Healthy" },
    { system_name: "system2", system_status: "Warning", capabilities_available: "Warning", op_capabilities_available: "Critical" },
    { system_name: "system3", system_status: "Healthy", capabilities_available: "Critical", op_capabilities_available: "Warning" },
    { system_name: "RhinoPill", system_status: "Healthy", capabilities_available: "Healthy", op_capabilities_available: "Healthy" }
  ]);
};
