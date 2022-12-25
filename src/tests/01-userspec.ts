import {User,user} from "../models/user";


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
  
});

});
