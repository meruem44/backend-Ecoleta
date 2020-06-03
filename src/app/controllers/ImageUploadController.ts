import { Request, Response } from 'express';

class FileController {
    async store(req: Request, res: Response) {
        const { location: url } = req.file;

        return res.json({ url });
    };
};

export default new FileController();