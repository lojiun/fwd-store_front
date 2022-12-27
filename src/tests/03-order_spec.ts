import { OrderStore,Order } from "../models/orders";
import express, { Request, Response } from 'express'
import { app } from "../server";
import dotenv from 'dotenv';
import supertest from "supertest";
dotenv.config()
const orderStore = new OrderStore();
const request= supertest(app);
import { token } from "./01-userspec";

  describe("Order Model", () => {
    it('convert to test ', () => {
        process.env.ENV = 'test';
        console.log(process.env.ENV )
     
     });

    it('should have index method ', () => {
        expect(orderStore.index).toBeDefined();


    });
  
     it('should  orderStore have a create method', () => {
        expect(orderStore.Create).toBeDefined();
    });

    it('should orderStore have a update method', () => {
        expect(orderStore.Update).toBeDefined();
    });
  
    it('should  orderStore have a delete method', () => {
        expect(orderStore.Delete).toBeDefined();
    });
    it('should return list of Orders ', async () => {
       
        console.log('lojiun'+token);
         const response = await request.get("/api/orders").set('Authorization', `Bearer ${token}`);
         expect(response.status).toEqual(200)
     });
    it('create method should add an order', async () => {

        const createdOrder: Order = {
            status:'active',
            user_id:1,
            orderId:1
        }
        const response = await request.post("/createOrder").send(createdOrder).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200)
    });

    it('show method should return the correct order', async () => {
        const response = await request.get("/order/1").set('Authorization', `Bearer ${token}`);
          expect(response.status).toEqual(200)
    
    });
    it('update method should update the  order', async () => {
        const updatedOrder: Order = {
            status:'complete',
            user_id:1,
            orderId:1
         }
         const response = await request.put("/updateOrder").send(updatedOrder).set('Authorization', `Bearer ${token}`);
         expect(response.status).toEqual(200)
    });
    it('delete method should remove the order', async () => {
        const response = await request.delete("/deleteOrder/1").set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200)
    });



})