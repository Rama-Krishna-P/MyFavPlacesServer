import { RequestHandler, Request, Response } from "express-serve-static-core";
import { Controller } from "../interfaces/controller";
import express from "express";

export class WebAppController implements Controller {
    setupRoutes(app: express.Application): void {
        app.get('/', this.getWebApp);
        app.get('/home', this.getWebApp);
    }

    private getWebApp(request: Request, response: Response) {
        response.sendFile('index.html', { root: __dirname + '/../public' });
    }
}