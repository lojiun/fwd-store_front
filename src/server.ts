import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import users_routes from './handlers/userHandler';
import orders_routes from './handlers/orderHandler';
import products_routes from './handlers/productHandler';
const corOptions={
  origin:"http://someotherdomain.com",
  optionsSuccessStatues:200
}

require('dotenv').config();
 export const app: express.Application = express();

app.use(cors(corOptions))
app.use(bodyParser.json());
users_routes(app);
orders_routes(app);
products_routes(app);
const PORT = 5000;
// const address: string = `127.0.0.0:5000`;

app.get('/', function (req: Request, res: Response) {
  res.send('hello from lojiun app')

})
app.listen(5000, function () {


  console.log(`starting app on ${PORT}`)
})