import {User,user} from "../models/user";

import supertest from "supertest";
import { app } from "../server";
const request= supertest(app);
const store= new User();
describe("User Model ", () => {

  describe("User Model", () => {
    it('should have index method ', () => {
        expect(store.index).toBeDefined();


    });
    it('should return list of users ', async () => {
        const users= await store.index();
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
        expect(response.status).toEqual(200)
    });
    it('create method should add an user', async () => {

        const createdUser: user = {
            id:1,
            name:"lojiun",
            password_Hashed:"$2b$10$AZReYZIeP3DHPxp9o1dZVuPOK1NSnm5lHno8O16GbW1FYxiY7PvlS"
        }
        const result = await store.Create(createdUser);
        const users= await store.index();
        const usersLength= users.length;
        expect(usersLength).toEqual(1);
    });
    it('update method should update the  user', async () => {
        const updatedUser: user = {
            id:1,
            name:"udacity",
            password_Hashed:"$2b$10$AZReYZIeP3DHPxp9o1dZVuPOK1NSnm5lHno8O16GbW1FYxiY7PvlS"
        }
        const result = await store.Update(1,updatedUser);
        const updated= await store.index()
        expect(updated[0].name).toEqual(updatedUser.name);
    });
  
});

});
