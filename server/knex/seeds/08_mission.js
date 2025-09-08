/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission').del()
  await knex('mission').insert([
    { mission_name: "Space_Control", systems: 1 }
  ]);
};
