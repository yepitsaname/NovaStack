/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'legoman', email: 'lego@gmail.com', password: '$2a$10$7PkdPzBA/mLIJS.9GgMJx.Pmf6R2Xjt5gaZ3LwkMC/hxR80gnh592', first_name: 'Noah', last_name: 'Lego', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'brickbuilder', email: 'builder@gmail.com', password: '$2a$10$UcWFA8SPsvZWsi98scBI6eIV.bghjZyFgeKTH6mkmKAwN1FU1WK1a', first_name: 'Emma', last_name: 'Stone', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'technerd', email: 'nerdtech@gmail.com', password: '$2a$10$gwv6M.B43Qmh7M9weYPXJe/rHe3l9mFQumWM2k6gztUdSSZX4PpEq', first_name: 'Liam', last_name: 'Cole', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'codemaster', email: 'code@gmail.com', password: '$2a$10$xz6fxmSCCsAdgCoN4KHLOeqGnmviYib5qjhGP79PHsWonxfCmdPkm', first_name: 'Sophia', last_name: 'Ray', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'gamerx', email: 'gamerx@gmail.com', password: '$2a$10$p5Ue6A/RKde1ZUjkx5aqTuqlIjA3IkFWN2IsDOcVH1fK/Xm9DpQZu', first_name: 'Mason', last_name: 'King', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'blockcrafter', email: 'crafter@gmail.com', password: '$2a$10$1MK3ONZGT3ZQQjOvmmn9xe6jzUV8yBRAM611JnSRUEWuGBM4xkBBm', first_name: 'Olivia', last_name: 'West', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'starblazer', email: 'star@gmail.com', password: '$2a$10$9muifhSCiza1viU4tC.tAO9FSBxBPIgQj.6X6kBg6jMAZY8ypMn4y', first_name: 'Ethan', last_name: 'Drew', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'cyberhack', email: 'cyber@gmail.com', password: '$2a$10$Rosp2iigbp43OHDpEFWe4.Q/PBFBCL9olrVar/wRW8neMyj3aAszW', first_name: 'Ava', last_name: 'Miller', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'digidream', email: 'dream@gmail.com', password: '$2a$10$cHNdG6KSjEZA8ClcaXqwHObg.lWYeoAwgblgmjPXGw1kqSDU9h602', first_name: 'Lucas', last_name: 'Parker', preferences: { theme: 'dark', layout: 'default' } },
    { username: 'matrixdev', email: 'matrix@gmail.com', password: '$2a$10$JRCUiQR8OF3E0H4j5v6Ulu4twNBLdXLHgUthmT0..5pftvmSqU0SK', first_name: 'Isabella', last_name: 'Knight', preferences: { theme: 'dark', layout: 'default' } }
  ]
  );
};
