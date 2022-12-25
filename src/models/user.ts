import client from '../database'

import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.PEPPER;
const saltRounds = process.env.SALT_ROUNDS;
export type user = {
    id?: number,
    name: string,
    password_Hashed: string
    

}

export class User{



    async index(): Promise<user[]> {

        try {
            const conn = await client.connect();
            const sql = "select * from users";
            const result = await conn.query(sql);
            conn.release();
            console.log(result.rows)
            return result.rows;
        } catch (error) {

            throw new Error(`cannot get users${error}`)

        }

    }

    async Create(_user: user): Promise<user> {

        try {
            const conn = await client.connect();
            const sql = 'insert into users (name,password_Hashed) values ($1,$2)';
            const encryptedPassword = bcrypt.hashSync(
                _user.password_Hashed + pepper, 
                Number(saltRounds)
              );
              console.log('encryptedPassword'+encryptedPassword)
            const result = await conn.query(sql, [_user.name,encryptedPassword]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`cannot create user${error}`)

        }

    }
    async authenticateUser(username: string, password: string): Promise<user | null> {
        const conn = await client.connect()
        const sql = 'SELECT password_Hashed FROM users WHERE name=($1)'
    
        const result = await conn.query(sql, [username])
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+pepper, user.password_Hashed)) {
            return user
          }
        }
    
        return null
      }


      async Update(userId: number, User: user): Promise<user> {

        try {
            const conn = await client.connect();
            const sql = 'update users set name=$1 ,password_Hashed=$2 where id= ($3)';
            const result = await conn.query(sql,  [User.name, User.password_Hashed,userId]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`cannot update user${error}`)

        }

    }
}

export default User;

