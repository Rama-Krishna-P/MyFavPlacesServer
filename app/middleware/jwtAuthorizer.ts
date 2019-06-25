import { Request, Response, NextFunction } from "express";
// import jwt from 'jsonwebtoken';

export function Authorize(req: Request, res: Response, next: NextFunction) {
    // let token = req.headers.authorization ? req.headers.authorization.valueOf().split(' ')[1] : undefined;
    // let key = process.env.JSON_KEY ? process.env.JSON_KEY.valueOf() : 'secret';
    // let expiresIn = process.env.JWT_TIMEOUT ? process.env.JWT_TIMEOUT.valueOf() : 180;

    // if (token && key) {
    //     try {
    //         const decoded = JSON.parse(JSON.stringify(jwt.verify(token, key).valueOf()));
    //         res.locals.userName = decoded.userName;
            
    //         if (decoded.expires) {
    //             let token = jwt.sign({ userName: decoded.userName, expires: true }, key, {
    //                 expiresIn: expiresIn });
    //             res.setHeader('authorization', `Bearer ${token}`);
    //         }

    //         next();
    //     } catch (error) {
    //         res.status(401).json({
    //             message: error
    //         })
    //     }
    // }
    // else {
    //     res.status(401).json({
    //         message: 'Auth failed'
    //     })
    // }
    next();
}