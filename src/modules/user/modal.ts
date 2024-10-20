import { HTTP_STATUS_CODE_201, HTTP_STATUS_CODE_400 } from "../../common/statusCode";
import { pool } from "../../db/pool";

export class UserModal {
    public async create(req: any, res: any) {
        try {
            if (req.body) {
                const { userName, password, email } = req.body;

                if (userName && password && email) {
                    let Query = 'INSERT INTO user (name, password, email) VALUES ( ?, ?, ?)';
                    const [result] = await pool.execute(Query, [userName, password, email]);
                    if (result) {
                        res.status(HTTP_STATUS_CODE_201).json({ message: 'User created successfully', status: true });
                    } else {
                        res.status(HTTP_STATUS_CODE_400).json({ message: 'User created failed', status: false });
                    }
                } else {
                    res.status(HTTP_STATUS_CODE_201).json({ message: 'Kindly fill all required fields', status: false });
                }
            }
        } catch (e: any) {
            res.status(HTTP_STATUS_CODE_400).json({ message: e.error || 'Error while creating user details', status: false });
        }
    }

    public async update(req: any, res: any) {
        try {
            if (req.body) {
                const { userName, password, email, userID } = req.body;

                if (userName && password && email) {
                    let Query = 'UPDATE user SET name = ?, password = ?, email = ?  WHERE user_id = ?';
                    const [result] = await pool.execute(Query, [userName, password, email, userID]);
                    if (result) {
                        res.status(HTTP_STATUS_CODE_201).json({ message: 'User update successfully', status: true });
                    } else {
                        res.status(HTTP_STATUS_CODE_400).json({ message: 'User update failed', status: false });
                    }
                } else {
                    res.status(HTTP_STATUS_CODE_201).json({ message: 'Kindly fill all required fields', status: false });
                }
            }
        } catch (e: any) {
            res.status(HTTP_STATUS_CODE_400).json({ message: e.error || 'Error while updating user details', status: false });
        }
    }

    public async read(req: any, res: any) {
        try {
            let Query = `SELECT user_id AS userID, name AS userName, email, password FROM user`;
            const [rows] = await pool.execute(Query);
            if (rows) {
                res.status(HTTP_STATUS_CODE_201).json({ message: 'User details get successfully', status: true, data: rows });
            } else {
                res.status(HTTP_STATUS_CODE_400).json({ message: 'User details get failed', status: false });
            }

        } catch (e: any) {
            res.status(HTTP_STATUS_CODE_400).json({ message: e.error || 'Error while getting user details', status: false });
        }
    }

    public async delete(req: any, res: any) {
        try {
            if (req.body) {
                const { userID } = req.body;
                if (userID) {
                    let Query = 'DELETE FROM user WHERE user_id = ?';

                    const [result] = await pool.execute(Query, [userID]);
                    if (result) {
                        res.status(HTTP_STATUS_CODE_201).json({ message: 'User created successfully', status: true, data: result });
                    } else {
                        res.status(HTTP_STATUS_CODE_400).json({ message: 'User created failed', status: false });
                    }
                }
            }

        } catch (e: any) {
            res.status(HTTP_STATUS_CODE_400).json({ message: e.error || 'Error while creating user details', status: false });
        }
    }
}

export default new UserModal();