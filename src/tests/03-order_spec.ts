import { OrderStore,Order } from "../models/orders";
import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
dotenv.config()
const orderStore = new OrderStore();



  describe("Order Model", () => {
    it('convert to test ', () => {
        process.env.ENV = 'test';
        console.log(process.env.ENV )
     
     });

    it('should have index method ', () => {
        expect(orderStore.index).toBeDefined();


    });
    it('should return list of Orders ', async () => {
        const orders= await orderStore.index();
        expect(orders).toEqual([]);


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

    it('create method should add an order', async () => {
        console.log("in orderspec method")
        const createdOrder: Order = {
            status:'active',
            user_id:1,
            orderId:1
        }
        const result = await orderStore.Create(createdOrder);
        console.log(result);
        const orders= await orderStore.index();
        const ordersLength= orders.length;
        expect(ordersLength).toEqual(1);
    });


    it('delete method should remove the order', async () => {
        orderStore.Delete(1);
        const result = await orderStore.index()

        expect(result.length).toEqual(0);
    });



})