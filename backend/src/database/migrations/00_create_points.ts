import Knex from 'Knex'


export async function up(knex: Knex){
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();

  
  })
}
export async function down(knex: Knex){
  return knex.schema.dropTable('points')
}