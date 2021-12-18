import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username').unique();
    table.string('password');
    table.string('name');
    table.string('photo');
    table.string('age');
    table.string('bio');
    table.string('sexuality');
    table.string('github');
    table.string('facebook');
    table.string('instagram');
    table.string('linkedin');
    table.string('location');
    table.string('spotify');
    table.string('language');
  }
  )
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}