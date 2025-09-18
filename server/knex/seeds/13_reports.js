/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('reports').del()
    await knex('reports').insert([
        { user_id: 1, system: 1, title: 'reports seed data', classification: 'unclassified', opscap: 'FMC', syscap: 'Other', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 2, title: 'reports seed data', classification: 'unclassified', opscap: 'PMC', syscap: 'FMC', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 3, title: 'reports seed data', classification: 'unclassified', opscap: 'NMC', syscap: 'NMC', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 4, title: 'reports seed data', classification: 'unclassified', opscap: 'ASI', syscap: 'ASI', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 5, title: 'reports seed data', classification: 'unclassified', opscap: 'Offline', syscap: 'Offline', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 7, title: 'reports seed data', classification: 'unclassified', opscap: 'FMC', syscap: 'FMC', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 8, title: 'reports seed data', classification: 'unclassified', opscap: 'FMC', syscap: 'FMC', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 9, title: 'reports seed data', classification: 'unclassified', opscap: 'FMC', syscap: 'FMC', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 8, title: 'reports seed data', classification: 'unclassified', opscap: 'FMC', syscap: 'FMC', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 1, title: 'reports seed data', classification: 'unclassified', opscap: 'FMC', syscap: 'FMC', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' },
        { user_id: 1, system: 5, title: 'reports seed data', classification: 'unclassified', opscap: 'FMC', syscap: 'FMC', short_description: 'test', long_description: 'test data long description', start: '2025-09-16', stop: '2025-09-19', impact: 'low', fix_action: 'rebooted computer', cause: 'Windows was open for too long' }
    ]);
};