/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('audit_action').del()
  await knex('audit_action').insert([
    {action_name: 'exampleAction'},
  ]);
};
