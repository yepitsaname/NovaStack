/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission').del()
  await knex('mission').insert([
    { "mission_name": "Space Control", "systems": {0: 1, 1: 2, 2: 3, 3: 4, 4: 5} },
    { "mission_name": "Missile Warning", "systems": {0: 6, 1: 7, 2: 8, 3: 9, 4: 10} },
    { "mission_name": "Satellite Communications", "systems": {} },
    { "mission_name": "Orbital Warfare", "systems": {} },
    { "mission_name": "Space Launch", "systems": {} },
    { "mission_name": "ISR Satellites", "systems": {} },
    { "mission_name": "Precision Navigation", "systems": {} },
    { "mission_name": "Weather Observation", "systems": {} },
    { "mission_name": "Space Domain Awareness", "systems": {} },
    { "mission_name": "Cyber Defense Space", "systems": {} },
    { "mission_name": "Deep Space Tracking", "systems": {} },
    { "mission_name": "Satellite Defense", "systems": {} },
    { "mission_name": "Orbital Logistics", "systems": {} },
    { "mission_name": "Lunar Support", "systems": {} },
    { "mission_name": "Debris Mitigation", "systems": {} },
    { "mission_name": "Electronic Warfare Space", "systems": {} },
    { "mission_name": "Global Broadcast Service", "systems": {} },
    { "mission_name": "Secure Comm Satellites", "systems": {} },
    { "mission_name": "Test Evaluation Space", "systems": {} },
    { "mission_name": "Battle Management C2", "systems": {} },
    { "mission_name": "Rapid Launch Response", "systems": {} },
    { "mission_name": "Hypersonic Tracking", "systems": {} },
    { "mission_name": "Nuclear Det Support", "systems": {} },
    { "mission_name": "Resilient Sat Networks", "systems": {} },
    { "mission_name": "Cadre Training Ops", "systems": {} }
  ]);
};
