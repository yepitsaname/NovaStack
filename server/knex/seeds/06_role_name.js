/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('role_name').del()
  await knex('role_name').insert([
    {role_name: 'myRoleName'},
  ]);
};
