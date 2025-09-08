/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('audit_result').del()
  await knex('audit_result').insert([
    {result_name: 'exampleResult'},
  ]);
};
