import { client, pool } from '../db/index';
import { IRegister } from '../models/register.model';
import { ISignin } from '../models/signin.model'
import bcrypt from 'bcrypt'
import { config } from '../config/config';
import * as jwt from 'jsonwebtoken'

export class SignInService {

    async Signin(signinDetails: ISignin) {
        const query = "SELECT * FROM users where email = $1 OR username = $2";
        const values = [signinDetails.email, signinDetails.username];

        const res = await pool.query(query, values);
        const user = res.rows[0];
        const isValid = await bcrypt.compare(signinDetails.password, user.password);
        if (!isValid) {
            throw new Error("Invalid username or password")
        }
        const token = jwt.sign(user, config.JWT_KEY)
        return token;
    }

    async Register(registerDetails: IRegister) {
        if (!registerDetails.email || !registerDetails.password || !registerDetails.username) {
            throw new Error("Invalid Request");
        }

        const password = await bcrypt.hash(registerDetails.password, config.SALT_ROUNDS)

        const query = "INSERT INTO users(username,email,password) VALUES($1,$2,$3)";
        const values = [registerDetails.username, registerDetails.email, password];
        const res = await pool.query(query, values);
        return res;
    }
}



export const signInService = new SignInService();
