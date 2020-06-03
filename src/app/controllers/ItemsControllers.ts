import { Request, Response } from 'express';
import knex from '../../database/connection';

class ItemsController {
    async index (req: Request, res: Response) {
        const items = await knex('items').select('*');
        
        console.log(items);
        return res.json(items);
    };

    async store (req: Request, res: Response) {
        const { url, title } = req.body;

        const item = {
            url,
            title
        }

        await knex('items').insert(item);

        return res.json(item);
    }

};

export default new ItemsController();