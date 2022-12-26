import { ProductStore,Product } from "../models/products";
const store = new ProductStore();
import supertest from "supertest";
import { app } from "../server";
const request= supertest(app);

describe("Product Model", () => {
    it('should have index method ', () => {
        expect(store.index).toBeDefined();


    });
    it('shouldreturn list of Products ', async () => {
        const books= await store.index();
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

    it('create method should add an product', async () => {

        const createdProduct: Product = {
           name:'lojiunProduct',
           price:12000
        }
        const result = await store.Create(createdProduct);
        const products= await store.index();
        const productLength= products.length;
        expect(productLength).toEqual(1);
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        const productLength= result.length;
        expect(productLength).toEqual(1);
    });

    it('show method should return the correct product', async () => {
        const response = await request.get("/product/1");
          expect(response.status).toEqual(200)
    });
    it('update method should update the  product', async () => {
        const updatedProduct: Product = {
            name:'Product',
            price:12000
         }
        const result = await store.Update(1,updatedProduct);
        const updated= await store.index()
        expect(updated[0].name).toEqual(updatedProduct.name);
    });
    it('delete method should remove the product', async () => {
        store.Delete(1);
        const result = await store.index()

        expect(result).toEqual([]);
    });



})