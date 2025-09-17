/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission').del()
  await knex('mission').insert([
    { mission_name: "Space_Control", systems: {0: 1, 1: 2, 2: 3, 3: 4, 4: 5} },
    { mission_name: "Space_Watch", systems: {0: 6, 1: 7, 2: 8, 3: 9, 4: 10} }
  ]);
};
