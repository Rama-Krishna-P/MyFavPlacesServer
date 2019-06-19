import { Request, Response } from "express-serve-static-core";

export abstract class ControllerBase {
    protected handleError(req: Request, res: Response) {
        res.statusCode = 500;
        res.end();
    }

    protected handleRequest(req: Request, res: Response, methodToCall: () => Promise<string>) {
        methodToCall().then(result => {
            res.send(result)
        }, (err) => {
            console.log(err);
            this.handleError(req, res);
        });
    }
}