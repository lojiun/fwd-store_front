import { ProductStore, Product } from "../models/products";
const store = new ProductStore();
import supertest from "supertest";
import { app } from "../server";
const request = supertest(app);
import { token } from "./01-userspec";

describe("Product Model", () => {


    it('create method should add an product', async () => {

        const createdProduct: Product = {
            name: 'lojiunProduct',
            price: 12000
        }
        const response = await request.post("/createProduct").send(createdProduct).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200)
    });

    it('index method should return a list of products', async () => {
        const response = await request.get("/api/products").set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200)
    });

    it('show method should return the correct product', async () => {
        const response = await request.get("/product/1").set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200)
    });
    it('update method should update the  product', async () => {
        const updatedProduct: Product = {
            name: 'Product',
            price: 12000
        }
        const response = await request.put("/updateProduct").send(updatedProduct).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200)
    });
    it('delete method should remove the product', async () => {
        const response = await request.delete("/deleteProduct/1").set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it('should have index method ', () => {
        expect(store.index).toBeDefined();


    });
    it('shouldreturn list of Products ', async () => {
        const books = await store.index();
        expect(books).toEqual([]);


    });
    it('should have a create method', () => {
        expect(store.Create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.Update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.Delete).toBeDefined();
    });


})