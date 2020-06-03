import knex from 'knex';
import { resolve } from 'path';

class Connection {
    public connection: knex

    constructor() {
        this.connection = knex({
            client: 'sqlite3',
            connection: {
                filename: resolve(__dirname, 'database.sqlite')
            },
            useNullAsDefault: true,
        });
    }
   
};

export default new Connection().connection;