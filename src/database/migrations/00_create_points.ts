import Knex from 'knex';

export async function up(knex: Knex) { // REALIZAR AS ALTERAÇÕS NO BANCO
    //CRIAR A TABELA
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();

        table.string('url').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatssap').notNullable();
        table.string('city').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('uf').notNullable();
    });
}

export async function down(knex: Knex) {
    //VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('points');
}