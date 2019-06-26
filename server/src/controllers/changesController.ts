import { Request, Response } from 'express';


import pool from '../database';

class ChangesController {

    public async list(req: Request, res: Response): Promise<void> {
        const changes = await pool.query('SELECT * FROM cambio');
        res.json(changes);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { user_id, id_cambio } = req.params;
        const changes = await pool.query('SELECT * FROM cambio WHERE user_id = ? and id_cambio = ?', [user_id, id_cambio]);
        console.log(changes.length);
        if (changes.length > 0) {
            return res.json(changes[0]);
        }
        res.status(404).json({ text: "The change doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO change set ?', [req.body]);
        res.json({ message: 'Change Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { user_id } = req.params;
        const oldUser = req.body;
        await pool.query('UPDATE change set ? WHERE user_id = ?', [req.body, user_id]);
        res.json({ message: "The change was Updated" });
    }

    // public async delete(req: Request, res: Response): Promise<void> {
    //     const { id_cambio } = req.params;
    //     await pool.query('DELETE FROM change WHERE user_id = ?', [id_cambio]);
    //     res.json({ message: "The change was deleted" });
    // }
}

const changesController = new ChangesController;
export default changesController;