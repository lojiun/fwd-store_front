
import dotenv from 'dotenv';
dotenv.config()
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
import express, { Request, Response } from "express";
import { User, user } from "../models/user";
import jwt from 'jsonwebtoken'

const storeUser = new User();
const create = async (req: Request, res: Response) => {
    console.log("user is getting created")
    console.log(req.body.username)
    const _user: user = {
        name: req.body.username, 
        password_Hashed: req.body.password
    }
    try {
        const newUser = await storeUser.Create(_user)
        var token = jwt.sign({ user: newUser }, JWT_TOKEN_SECRET as string);
        res.status(200).json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}


const authenticate = async (req: Request, res: Response) => {
    const user: user = {
        name: req.body.name,
        password_Hashed: req.body.password_Hashed,
    }
    try {
        const u = await storeUser.authenticateUser(user.name, user.password_Hashed)
        var token = jwt.sign({ user: u }, JWT_TOKEN_SECRET as string);
        res.status(200).json(token)
    } catch (error) {
        res.status(401)
        res.json({ error })
    }
}

const index = async (req: Request, res: Response) => {
    try {
        const users =  await storeUser.index();
        res.status(200).json(users);

    } catch (error) {
        res.status(400);
        res.json(error);


    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedUser: user = {
            name: req.body.name,
            password_Hashed: req.body.password_Hashed,
        }
        const Updated = await storeUser.Update(req.body.id,updatedUser);
        res.status(200).json(Updated);

    } catch (error) {
        res.status(400);
        res.json(error);


    }
}
const users_routes = (app: express.Application) => {

    app.get('/api/users', index)
    app.get('/api/authenticate', authenticate)
    app.post('/createUser', create)
    app.put('/updateUser', update)

   
}
export default users_routes;
