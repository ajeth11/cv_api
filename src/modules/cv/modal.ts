import { HTTP_STATUS_CODE_201, HTTP_STATUS_CODE_400 } from "../../common/statusCode";
import { pool } from "../../db/pool";

export class CVModal {
    public async create(req: any, res: any) {
        try {
            if (req.body) {
                const { name, email, phoneNo, summary, experience, education, skill } = req.body;

                if (name && email && phoneNo && summary && skill) {
                    let Query = 'INSERT INTO cv_details (name, email, phone_no, summary, experience_json, education_json, skill) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
                    const [result] = await pool.execute(Query, [name, email, phoneNo, summary, experience, education, skill]);
                    if (result) {
                        res.status(HTTP_STATUS_CODE_201).json({ message: 'CV details created successfully', status: true });
                    } else {
                        res.status(HTTP_STATUS_CODE_400).json({ message: 'CV details created failed', status: false });
                    }
                } else {
                    res.status(HTTP_STATUS_CODE_201).json({ message: 'Kindly fill all required fields', status: false });
                }
            }
        } catch (e: any) {
            res.status(HTTP_STATUS_CODE_400).json({ message: e.error || 'Error while creating CV details', status: false });
        }
    }

    public async update(req: any, res: any) {
        try {
            if (req.body) {
                const { name, email, phoneNo, summary, experience, education, skill, cvID } = req.body;

                if (name && email && phoneNo && summary && skill && cvID) {
                    let Query = 'UPDATE cv_details SET name = ?, email = ?, phone_no = ?, summary = ?, experience_json = ?, education_json = ?, skill = ?  WHERE cv_id = ?'
                    const [result] = await pool.execute(Query, [name, email, phoneNo, summary, experience, education, skill, cvID]);
                    if (result) {
                        res.status(HTTP_STATUS_CODE_201).json({ message: 'CV details update successfully', status: true });
                    } else {
                        res.status(HTTP_STATUS_CODE_400).json({ message: 'CV details update failed', status: false });
                    }
                } else {
                    res.status(HTTP_STATUS_CODE_201).json({ message: 'Kindly fill all required fields', status: false });
                }
            }
        } catch (e: any) {
            res.status(HTTP_STATUS_CODE_400).json({ message: e.error || 'Error while updating CV details', status: false });
        }
    }

    public async read(req: any, res: any) {
        try {
            let Query = `SELECT cv_id AS cvID, name, email, phone_no AS phoneNo, summary, experience_json AS experience, education_json AS education, skill FROM cv_details`;
            const [rows] = await pool.execute(Query);
            if (rows) {
                res.status(HTTP_STATUS_CODE_201).json({ message: 'User created successfully', status: true, data: rows });
            } else {
                res.status(HTTP_STATUS_CODE_400).json({ message: 'User created failed', status: false });
            }

        } catch (e: any) {
            res.status(HTTP_STATUS_CODE_400).json({ message: e.error || 'Error while creating user details', status: false });
        }
    }

    public async delete(req: any, res: any) {
        try {
            if (req.body) {
                const { cvID } = req.body;
                if (cvID) {
                    let Query = 'DELETE FROM cv_details WHERE cv_id = ?';
                    const [result] = await pool.execute(Query, [cvID]);
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

export default new CVModal();