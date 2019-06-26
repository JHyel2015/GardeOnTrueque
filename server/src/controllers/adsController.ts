import { Request, Response } from 'express';


import pool from '../database';

class AdsController {

    public async list(req: Request, res: Response): Promise<void> {
        const ads = await pool.query('SELECT * FROM anuncio');
        res.json(ads);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { user_id, id_anuncio } = req.params;
        const ads = await pool.query('SELECT * FROM anuncio WHERE user_id = ? and id_anuncio = ?', [user_id, id_anuncio]);
        console.log(ads.length);
        if (ads.length > 0) {
            return res.json(ads[0]);
        }
        res.status(404).json({ text: "The ad doesn't exist" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO anuncio set ?', [req.body]);
        res.json({ message: 'Ad Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id_anuncio } = req.params;
        const oldUser = req.body;
        await pool.query('UPDATE anuncio set ? WHERE id_anuncio = ?', [req.body, id_anuncio]);
        res.json({ message: "The ad was Updated" });
    }

    // public async delete(req: Request, res: Response): Promise<void> {
    //     const { id } = req.params;
    //     await pool.query('DELETE FROM users WHERE uid = ?', [id]);
    //     res.json({ message: "The user was deleted" });
    // }
}

const adsController = new AdsController;
export default adsController;