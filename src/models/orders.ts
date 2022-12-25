import client from '../database'
export type Order = {
    orderId?: number,
    status :string ,
    user_id :number

}
export class OrderStore {


    async index(): Promise<Order[]> {

        try {
            const conn = await client.connect();
            const sql = "select * from orders";
            const result = await conn.query(sql);
            conn.release();
            console.log(result.rows)
            return result.rows;
        } catch (error) {

            throw new Error(`cannot get orders${error}`)

        }

    }


    async show(orderId: number): Promise<Order> {

        try {
            const conn = await client.connect();
            const sql = 'select * from orders where orderId =($1)';
            const result = await conn.query(sql, [orderId]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`cannot show order ${error}`)

        }
    }

    async Create(order: Order): Promise<Order> {

        try {
            const conn = await client.connect();
            const sql = 'insert into orders (status,user_id) values ($1,$2)';
            const result = await conn.query(sql, [order.status, order.user_id]);
            conn.release();
            console.log('inside create order');
            return result.rows[0];
        } catch (error) {
            throw new Error(`cannot create order ${error}`)

        }

    }

    async Update(orderId: number, order: Order): Promise<Order> {

        try {
            const conn = await client.connect();
            const sql = 'update orders set status=$1 ,user_id=$2 where orderId= ($3)';
            const result = await conn.query(sql,  [order.status, order.user_id,orderId]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`cannot update order${error}`)

        }

    }

    async Delete(orderId: number) {
        try {
            const conn = await client.connect();
            const sql = 'Delete from orders where orderId=($1)';
            const result = await conn.query(sql, [orderId]);
            conn.release();
        } catch (error) {
            throw new Error(`cannot Delete order${error}`)

        }

    }


}




// // // @ts-ignore
// // import client from '../database'

// // export type Book = {
// //      id: number;
// //      title: string;
// //      author: string;
// //      totalPages: number;
// //      summary: string;
// // }

// // export class BookStore {
// //   async index(): Promise<Book[]> {
// //     try {
// //       // @ts-ignore
// //       const conn = await client.connect()
// //       const sql = 'SELECT * FROM books'

// //       const result = await conn.query(sql)

// //       conn.release()

// //       return result.rows 
// //     } catch (err) {
// //       throw new Error(`Could not get books. Error: ${err}`)
// //     }
// //   }

// //   async show(id: string): Promise<Book> {
// //     try {
// //     const sql = 'SELECT * FROM books WHERE id=($1)'
// //     // @ts-ignore
// //     const conn = await client.connect()

// //     const result = await conn.query(sql, [id])

// //     conn.release()

// //     return result.rows[0]
// //     } catch (err) {
// //         throw new Error(`Could not find book ${id}. Error: ${err}`)
// //     }
// //   }

// //   async create(b: Book): Promise<Book> {
// //       try {
// //     const sql = 'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
// //     // @ts-ignore
// //     const conn = await client.connect()

// //     const result = await conn
// //         .query(sql, [b.title, b.author, b.totalPages, b.summary])

// //     const book = result.rows[0]

// //     conn.release()

// //     return book
// //       } catch (err) {
// //         //   throw new Error(`Could not add new book ${title}. Error: ${err}`)
// //       }
// //   }

// //   async delete(id: string): Promise<Book> {
// //       try {
// //     const sql = 'DELETE FROM books WHERE id=($1)'
// //     // @ts-ignore
// //     const conn = await client.connect()

// //     const result = await conn.query(sql, [id])

// //     const book = result.rows[0]

// //     conn.release()

// //     return book
// //       } catch (err) {
// //           throw new Error(`Could not delete book ${id}. Error: ${err}`)
// //       }
// //   }
// // }import dotenv from 'dotenv'
// import { Pool } from 'pg'

// dotenv.config()

// const {
//   POSTGRES_HOST,
//   POSTGRES_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_TEST_DB,
//   ENV,
// } = process.env

// let client
// console.log(ENV)

// if(ENV === 'test') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//   })
// }

// if(ENV === 'dev') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_TEST_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//   })
// }

// export default client