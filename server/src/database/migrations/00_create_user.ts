import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('photo');
    table.string('age');
    table.string('bio');
    table.string('sexuality');
  }
  )
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}