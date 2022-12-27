import { User, user } from "../models/user";

import supertest from "supertest";
import { app } from "../server";
const request = supertest(app);
const store = new User();
export let token: string = "";

describe("User Model ", () => {

    describe("User Model", () => {
        it('should have index method ', () => {
            expect(store.index).toBeDefined();


        });
        it('should return list of users ', async () => {
            const users = await store.index();
            expect(users).toEqual([]);


        });
        it('should have a create method', () => {
            expect(store.Create).toBeDefined();
        });

        it('should have a update method', () => {
            expect(store.Update).toBeDefined();
        });

        it('should have a authenticate method', () => {
            expect(store.authenticateUser).toBeDefined();
        });

        it('should  authenticate user', async () => {
            const response = await request.get("/api/authenticate");
            token = response.body;
            console.log(token);
            expect(response.status).toEqual(200)
        });
        it('create method should add an user', async () => {
            const createdUser: user = {
                id: 1,
                name: "lojiun",
                password_Hashed: "$2b$10$AZReYZIeP3DHPxp9o1dZVuPOK1NSnm5lHno8O16GbW1FYxiY7PvlS"
            }
            const response = await request.post("/createUser").send(createdUser);
            expect(response.status).toEqual(200)
        
        });
        it('update method should update the  user', async () => {
            const updatedUser: user = {
                id: 1,
                name: "udacity",
                password_Hashed: "$2b$10$AZReYZIeP3DHPxp9o1dZVuPOK1NSnm5lHno8O16GbW1FYxiY7PvlS"
            }
            const response = await request.put("/updateUser").send(updatedUser);
            expect(response.status).toEqual(200)
          
        });

    });

});
