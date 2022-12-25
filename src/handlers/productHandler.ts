import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Product, ProductStore } from "../models/products";
const store = new ProductStore();

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET
dotenv.config()
const index = async (req: Request, res: Response) => {
    try {
        const products =  await store.index();
        res.json(products);

    } catch (error) {
        res.status(400);
        res.json(error);


    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedProduct: Product = {
            name: req.body.name,
            price: req.body.price
          
        }
        const Updated = await store.Update(req.body.productId,updatedProduct);
        res.json(Updated);

    } catch (error) {
        res.status(400);
        res.json(error);


    }
}
const destroy = async (req: Request, res: Response) => {
    try {
    
        const Deleted =  await store.Delete(req.params.productId as unknown as number);
        res.json(Deleted);
    } catch (error) {
        res.status(400);
        res.json(error);


    }
}
const show = async (req: Request, res: Response) => {
    try {
    
        const _product =  await store.show(req.params.productId as unknown as number);
        res.json(_product);
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
        const createdProduct: Product = {
            name: req.body.name,
            price: req.body.price
           
        }
        const CreatedProduct = await store.Create(createdProduct);
        res.status(200).json(CreatedProduct);

    } catch (error) {
        res.status(400);
        res.json(error);


    }
}

const products_routes = (app: express.Application) => {

    app.get('/api/products', index)
    app.post('/createProduct', create)
    app.put('/updateProduct', update)
    app.delete('/deleteProduct/:productId', destroy)
    app.get('/product/:productId', show)
}
export default products_routes;