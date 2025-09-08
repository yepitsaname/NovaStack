/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    { title: 'task title', description: 'some description', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
  ]);
};
