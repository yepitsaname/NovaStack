/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
{ title: 'Prepare mission briefing slides', description: 'Create PowerPoint with mission objectives and tasks', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Update comms protocols', description: 'Document updated secure communication methods', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Inventory supplies', description: 'Check and log all mission supplies in database', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Calibrate equipment', description: 'Test and calibrate mission-critical equipment', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Coordinate travel logistics', description: 'Book flights, hotels, and transportation for mission team', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Conduct security checks', description: 'Run background checks for new mission personnel', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Review contingency plans', description: 'Update emergency fallback procedures', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Finalize mission budget', description: 'Verify expenses and funding allocations', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Draft press release', description: 'Prepare announcement for external communication', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Assign operational roles', description: 'Define each team member’s responsibilities', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Test backup systems', description: 'Ensure redundancy systems are operational', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Upload GIS maps', description: 'Provide latest geo maps for mission planning', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Simulate mission run-through', description: 'Conduct dry-run for full operation flow', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Confirm field partners', description: 'Verify agreements with partner agencies', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Set up data pipelines', description: 'Integrate all mission telemetry into dashboards', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Conduct safety training', description: 'Ensure all personnel are trained on safety protocols', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Verify satellite access', description: 'Confirm uplink privileges for mission comms', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Check weather reports', description: 'Obtain forecast for mission period', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Validate access credentials', description: 'Ensure all mission accounts are updated and active', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Audit mission timeline', description: 'Review key milestones and deadlines', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Update medical kits', description: 'Replace expired items and restock necessities', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Install monitoring tools', description: 'Set up system for real-time tracking of mission', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Prepare debrief template', description: 'Create structure for after-mission reports', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Verify insurance coverage', description: 'Ensure mission and personnel are covered by insurance', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 },
{ title: 'Schedule team sync', description: 'Arrange weekly alignment meeting with all mission leads', mission_id: 1, status: 1, due_date: '2025-09-30', assignee: 1 }

  ]);
};
