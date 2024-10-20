import { HTTP_STATUS_CODE_404, HTTP_STATUS_CODE_500 } from "../common/statusCode";
import sanitizeHtml from 'sanitize-html';


class Middleware {

    constructor() { }

    public async sanitizeHtmlMiddleware(req: any, res: any, next: any) {
        try {
            if (req.body) {
                let stringifiedData = JSON.stringify(req.body);
                stringifiedData = sanitizeHtml(stringifiedData);
                stringifiedData = stringifiedData.replace(/&amp;/g, "&");
                stringifiedData = stringifiedData.replace(/&gt;/g, ">");
                stringifiedData = stringifiedData.replace(/&lt;/g, "<");

                req.body = JSON.parse(stringifiedData);
            }

            if (req.query) {
                Object.keys(req.query).forEach((key) => {
                    req.query[key] = sanitizeHtml(req.query[key]);
                });
            }
            next();
        } catch (error: any) {
            res.status(HTTP_STATUS_CODE_500).json({ message: error.message || 'Internal sever error', status: false });
        }
    }

    public async contentTypeCheckMiddleware(req: any, res: any, next: any) {

        const allowedContentType = ['application/json',
            'text/plain',
            'application/x-www-form-urlencoded',
            'multipart/form-data',
            'text/csv',
            'application/pdf',
            'image/jpeg',
            'image/png',]
        const contentType = req.headers['content-type'];

        if (contentType && allowedContentType.includes(contentType) || contentType.includes('multipart/form-data')) {
            next();
        } else {
            res.status(HTTP_STATUS_CODE_500).json({ message:'request content type not valid`, "Invalid Content-Type', status: false });
        }
    };
}

export default new Middleware();
