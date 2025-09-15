/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("status").del();
  await knex("status").insert([
    { status: "Requested" },
    { status: "Pending" },
    { status: "Assigned" },
    { status: "Completed" },
    { status: "Archived" }
  ]);
};
