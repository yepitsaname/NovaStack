/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('reports').del()
  await knex('reports').insert([
    { user_id: 1, system: 1, title: 'reports seed data', classification: 'U', opscap: 'Green', syscap: 'Green', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
    { user_id: 1, system: 1, title: 'reports seed data', classification: 'U', opscap: 'Green', syscap: 'Green', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
    { user_id: 1, system: 1, title: 'reports seed data', classification: 'U', opscap: 'Green', syscap: 'Green', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
    { user_id: 1, system: 1, title: 'reports seed data', classification: 'U', opscap: 'Green', syscap: 'Green', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' }
  ]);
};

