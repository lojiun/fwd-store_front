import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { OrderStore,Order } from "../models/orders";
const store = new OrderStore();
import dotenv from 'dotenv';
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET
dotenv.config()
const index = async (req: Request, res: Response) => {
    try {
        const orders =  await store.index();
        res.status(200).json(orders);

    } catch (error) {
        res.status(400);
        res.json(error);


    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedOrder: Order = {
            status: req.body.status,
            user_id: req.body.user_id
          
        }
        console.log('req.body.orderId'+req.body.orderId)
        const Updated = await store.Update(req.body.orderId,updatedOrder);
        res.status(200).json(Updated);

    } catch (error) {
        res.status(400);
        res.json(error);


    }
}
const destroy = async (req: Request, res: Response) => {
    try {
    
        const Deleted =  await store.Delete(req.params.orderId as unknown as number);
        res.status(200).json(Deleted);
    } catch (error) {
        res.status(400);
        res.json(error);


    }
}
const show = async (req: Request, res: Response) => {
    try {
    
        const _order =  await store.show(req.params.orderId as unknown as number);
        res.status(200).json(_order);
    } catch (error) {
        res.status(400);
        res.json(error);


    }
}
const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1] 
        jwt.verify(token,JWT_TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const createdOrder: Order = {
            status: req.body.status,
            user_id: req.body.user_id
           
        }
        const CreatedOrder = await store.Create(createdOrder);
        res.status(200).json(CreatedOrder);

    } catch (error) {
        res.status(400);
        res.json(error);


    }
}

const orders_routes = (app: express.Application) => {

    app.get('/api/orders', index)
    app.post('/createOrder', create)
    app.put('/updateOrder', update)
    app.delete('/deleteOrder/:orderId', destroy)
    app.get('/order/:orderId', show)
}
export default orders_routes;