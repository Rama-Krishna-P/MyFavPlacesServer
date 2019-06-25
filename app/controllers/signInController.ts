import { ControllerBase } from "./controller-base";
import { Controller } from "../interfaces/controller";
import { Application, Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class SignInController extends ControllerBase implements Controller {
    constructor() {
        super();
    }

    setupRoutes(app: Application): void {
        app.post('/signIn', this.signIn.bind(this));
    }

    private signIn(req: Request, res: Response, nextFunction: NextFunction) {
        // password: Rama
        if (req.body.userName === 'rkp' && req.body.password) {
            bcrypt.compare(req.body.password, '$2b$10$kvv9iZZexA4V8McTOgUs9uZvinonqm4expcoxy66bJ32Q4x.Vh3su', (err, result) => {
                if (result) {
                    let key: string = process.env.JSON_KEY ? process.env.JSON_KEY.valueOf() : "secret";
                    let expiresIn = process.env.JWT_TIMEOUT ? process.env.JWT_TIMEOUT.valueOf() : 180;

                    let token = jwt.sign({ userName: req.body.userName, expires: true }, key, {
                        expiresIn: expiresIn
                    })
                    res.setHeader('authorization', `Bearer ${token}`);
                    res.status(200).json({
                        userName: req.body.userName,
                        token: token,
                    });
                }
                else {
                    res.status(401).json({
                        message: 'Auth failed'
                    })
                }
            })
        }
        else {
            res.status(401).json({
                message: 'Auth failed'
            })
        }
    }
}
