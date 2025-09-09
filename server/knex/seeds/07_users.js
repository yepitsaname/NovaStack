/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'legoman', email: 'lego@gmail.com', password: '$2a$10$7PkdPzBA/mLIJS.9GgMJx.Pmf6R2Xjt5gaZ3LwkMC/hxR80gnh592', first_name: 'Noah', last_name: 'Lego' }
  ]);
};
