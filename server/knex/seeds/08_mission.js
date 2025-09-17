/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('mission').del()
  await knex('mission').insert([
    { "mission_name": "Space_Control", "systems": 1 },
    { "mission_name": "Missile_Warning", "systems": 2 },
    { "mission_name": "Satellite_Communications", "systems": 3 },
    { "mission_name": "Orbital_Warfare", "systems": 4 },
    { "mission_name": "Space_Launch", "systems": 5 },
    { "mission_name": "ISR_Satellites", "systems": 6 },
    { "mission_name": "Precision_Navigation", "systems": 7 },
    { "mission_name": "Weather_Observation", "systems": 8 },
    { "mission_name": "Space_Domain_Awareness", "systems": 9 },
    { "mission_name": "Cyber_Defense_Space", "systems": 10 },
    { "mission_name": "Deep_Space_Tracking", "systems": 11 },
    { "mission_name": "Satellite_Defense", "systems": 12 },
    { "mission_name": "Orbital_Logistics", "systems": 13 },
    { "mission_name": "Lunar_Support", "systems": 14 },
    { "mission_name": "Debris_Mitigation", "systems": 15 },
    { "mission_name": "Electronic_Warfare_Space", "systems": 16 },
    { "mission_name": "Global_Broadcast_Service", "systems": 17 },
    { "mission_name": "Secure_Comm_Satellites", "systems": 18 },
    { "mission_name": "Test_Evaluation_Space", "systems": 19 },
    { "mission_name": "Battle_Management_C2", "systems": 20 },
    { "mission_name": "Rapid_Launch_Response", "systems": 21 },
    { "mission_name": "Hypersonic_Tracking", "systems": 22 },
    { "mission_name": "Nuclear_Det_Support", "systems": 23 },
    { "mission_name": "Resilient_Sat_Networks", "systems": 24 },
    { "mission_name": "Cadre_Training_Ops", "systems": 25 }
  ]);
};
