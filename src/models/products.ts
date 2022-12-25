import client from '../database'
export type Product = {
    productId?: number,
    name :string ,
    price :number

}
export class ProductStore {



    async index(): Promise<Product[]> {

        try {
            const conn = await client.connect();
            const sql = "select * from products";
            const result = await conn.query(sql);
            conn.release();
            console.log(result.rows)
            return result.rows;
        } catch (error) {

            throw new Error(`cannot get products${error}`)

        }

    }


    async show(productId: number): Promise<Product> {

        try {
            const conn = await client.connect();
            const sql = 'select * from products where productId =($1)';
            const result = await conn.query(sql, [productId]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`cannot show product ${error}`)

        }
    }

    async Create(product: Product): Promise<Product> {

        try {
            const conn = await client.connect();
            const sql = 'insert into products (name,price) values ($1,$2)';
            const result = await conn.query(sql, [product.name, product.price]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`cannot create product ${error}`)

        }

    }

    async Update(productId: number, product: Product): Promise<Product> {

        try {
            const conn = await client.connect();
            const sql = 'update products set name=$1 ,price=$2 where productId= ($3)';
            const result = await conn.query(sql,  [product.name, product.price,productId]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`cannot update product${error}`)

        }

    }

    async Delete(productId: number) {
        try {
            const conn = await client.connect();
            const sql = 'Delete from products where productId=($1)';
            const result = await conn.query(sql, [productId]);
            conn.release();
        } catch (error) {
            throw new Error(`cannot Delete product${error}`)

        }

    }


}




