import { Request, Response } from 'express';


import pool from '../database';

class PlantsController {

    public async list(req: Request, res: Response): Promise<void> {
        const plants = await pool.query('SELECT * FROM planta');
        res.json(plants);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { user_id, id_planta } = req.params;
        const plants = await pool.query('SELECT * FROM planta WHERE user_id = ? and id_planta = ?', [user_id, id_planta]);
        console.log(plants.length);
        if (plants.length > 0) {
            return res.json(plants[0]);
        }
        res.status(404).json({ text: "The plant doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO planta set ?', [req.body]);
        res.json({ message: 'Plant Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id_planta } = req.params;
        const oldUser = req.body;
        await pool.query('UPDATE planta set ? WHERE id_planta = ?', [req.body, id_planta]);
        res.json({ message: "The plant was Updated" });
    }

    // public async delete(req: Request, res: Response): Promise<void> {
    //     const { id } = req.params;
    //     await pool.query('DELETE FROM users WHERE uid = ?', [id]);
    //     res.json({ message: "The user was deleted" });
    // }
}

const plantsController = new PlantsController;
export default plantsController;