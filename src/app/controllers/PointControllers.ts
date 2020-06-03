import { Request, Response } from 'express';
import Queue from '../lib/Queue';
import knex from '../../database/connection';
import * as yup from 'yup';

class PointController {
    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        const parsedItems = String(items).split(',')
            .map(item => Number(item.trim()));


        const points = knex('points')
            .join('point_item', 'points.id', '=', 'point_item.point_id')
            .whereIn('point_item.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        if (!points) {
            return res.status(400).json({ message: 'point not found' });
        }

        res.json(points);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            res.status(400).json({ message: 'point not found' });
        }

        const items = await knex('items')
            .join('point_item', 'items.id', '=', 'point_item.item_id')
            .where('point_item.point_id', id)
            .select('items.title');

        res.json({ point, items });
    }

    async store(req: Request, res: Response) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            whatssap: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
            city: yup.string().required(),
            uf: yup.string().required(),
            url: yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            res.status(400).json({ err: 'Validations Fails' });
        };

        const {
            name,
            email,
            url,
            whatssap,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        const trx = await knex.transaction(); // inicia uma trasaction

        const point = {
            url,
            name,
            email,
            whatssap,
            latitude,
            longitude,
            city,
            uf
        };

        const sendEmail = {
            name,
            email
        };

        await Queue.add('RegistrationMail', { sendEmail });

        const insertedIds  = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        });

        await trx('point_item').insert(pointItems);

        trx.commit();

        return res.json({
            id: point_id,
            ...point
        });

    };

};

export default new PointController();