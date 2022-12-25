import { ProductStore,Product } from "../models/products";
const store = new ProductStore();

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
        const result = await store.show(1);
        const products= await store.index();
        const productLength= products.length;
        expect(productLength).toEqual(1);
    });

    it('delete method should remove the product', async () => {
        store.Delete(1);
        const result = await store.index()

        expect(result).toEqual([]);
    });



})