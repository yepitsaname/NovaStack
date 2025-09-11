/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("system_status").del();
  await knex("system_status").insert([
    { system_name: "system1", system_status: "Critical", capabilities_available: 0},
    { system_status: "Warning" },
    { system_status: "Healthy" }
  ]);
};

// le.string("system_name");
//     table.string("system_status");
//     table.integer("capabilities_available");