/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('reports').del()
    await knex('reports').insert([
        { user_id: 1, system: 1, title: 'reports seed data 1', classification: 'unclassified', opscap: 'Green', syscap: 'Green', short_description: 'test 1', long_description: 'test data long description 1', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 1, title: 'reports seed data 2', classification: 'unclassified', opscap: 'Green', syscap: 'Green', short_description: 'test 2', long_description: 'test data long description 2', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'cleared cache', cause: 'System memory was overloaded' },
        { user_id: 1, system: 1, title: 'reports seed data 3', classification: 'unclassified', opscap: 'Green', syscap: 'Amber', short_description: 'test 3', long_description: 'test data long description 3', start: '2025-09-16', stop: '2025-09-19', impact: 'medium', fix_action: 'updated drivers', cause: 'Graphics driver crash' },
        { user_id: 1, system: 1, title: 'reports seed data 4', classification: 'unclassified', opscap: 'Amber', syscap: 'Green', short_description: 'test 4', long_description: 'test data long description 4', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'reinstalled software', cause: 'Application files corrupted' },
        { user_id: 1, system: 1, title: 'reports seed data 5', classification: 'unclassified', opscap: 'Green', syscap: 'Green', short_description: 'test 5', long_description: 'test data long description 5', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'restarted network service', cause: 'Network timeout issue' },
        { user_id: 1, system: 1, title: 'reports seed data 6', classification: 'unclassified', opscap: 'Red', syscap: 'Green', short_description: 'test 6', long_description: 'test data long description 6', start: '2025-09-16', stop: '2025-09-19', impact: 'high', fix_action: 'rolled back patch', cause: 'Patch incompatibility' },
        { user_id: 1, system: 1, title: 'reports seed data 7', classification: 'unclassified', opscap: 'Green', syscap: 'Amber', short_description: 'test 7', long_description: 'test data long description 7', start: '2025-09-16', stop: '2025-09-19', impact: 'medium', fix_action: 'reset configuration', cause: 'Misconfigured settings' },
        { user_id: 1, system: 1, title: 'reports seed data 8', classification: 'unclassified', opscap: 'Amber', syscap: 'Amber', short_description: 'test 8', long_description: 'test data long description 8', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'increased memory allocation', cause: 'Low resource availability' },
        { user_id: 1, system: 1, title: 'reports seed data 9', classification: 'unclassified', opscap: 'Green', syscap: 'Green', short_description: 'test 9', long_description: 'test data long description 9', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted server', cause: 'Session leaks detected' },
        { user_id: 1, system: 1, title: 'reports seed data 10', classification: 'unclassified', opscap: 'Green', syscap: 'Red', short_description: 'test 10', long_description: 'test data long description 10', start: '2025-09-16', stop: '2025-09-19', impact: 'critical', fix_action: 'full system restore', cause: 'Kernel failure' }
    ]);
};