/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission_systems').del()
  await knex('mission_systems').insert([
    { colName: 'rowValue1' },
    { colName: 'rowValue2' },
    { colName: 'rowValue3' }
  ]);
};
