import dotenv from 'dotenv';
import { Pool } from 'pg'
require('dotenv').config();

dotenv.config()
// let client=new Pool();
let client=new Pool() ;
const {
    POSTGRES_HOST,
    POSTGRES_DB_DEV,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env


console.log('env : '+ENV)
if (ENV=='env') {
 client = new Pool({ connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB_DEV}`});
    
}
else{
     client = new Pool({ connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB_TEST}`});

}
  


export default client