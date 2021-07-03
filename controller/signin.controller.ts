import { NextFunction, Request, Response } from 'express';
import { SignInService } from '../services/signin.service'
import { IRegister } from '../models/register.model'
import { ISignin } from '../models/signin.model';
import { config } from '../config/config'
import * as jwt from 'jsonwebtoken';

export class SignInController {
    signinService: SignInService
    constructor() {
        this.signinService = new SignInService();
    }

    async Signin(req: Request, res: Response) {
        const body = req.body as ISignin;
        const token = await this.signinService.Signin(body);
        res.json(token);
    }

    async Register(req: Request, res: Response) {
        const body = req.body as IRegister;
        const registerResult = await this.signinService.Register(body);
        res.json(registerResult);
    }

    async getData(req: Request, res: Response) {
        // jwt.verify(req.token, config.JWT_KEY, (err: Error, authData) => {

        // })
    }

    verifyToken(req: Request, res: Response, next: NextFunction) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader != 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            // req.token = bearerToken;
            next()


        } else {
            res.sendStatus(403);
        }
    }

}

export const signInController = new SignInController();