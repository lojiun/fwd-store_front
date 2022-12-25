
Project Summary
The company's owners want to build a web storefront to display their great product concepts. Users must be able to search the whole product catalogue, read a single product's details, and add items to an order that they can later view in their shopping cart. The front end of this app is being built by a coworker, and you have been given the duty of creating the API that will support it. These are the notes from a meeting with the front-end developer that outline the endpoints the API must provide as well as the data shapes that both the front-end and the back-end agree satisfy the application's demands.


## API Endpoints

***** API endpoints *****
Get http://localhost:5000/order/1 
Delete  http://localhost:5000/deleteOrder/1
Delete  http://localhost:5000/deleteProduct/2
get http://localhost:5000/product/1
post http://localhost:5000/createOrder
post http://localhost:5000/createUser
put http://localhost:5000/updateOrder
post http://localhost:5000/createProduct
put http://localhost:5000/updateProduct
put http://localhost:5000/updateUser
get http://localhost:5000/api/products
get http://localhost:5000/api/users
get http://localhost:5000/api/authenticate
get http://localhost:5000/api/orders






***** API for the requirements *****


----------------------------------------------------------------------------------------------------
***** tables *****
# User

    id SERIAL PRIMARY KEY,
    name VARCHAR(15),
    password_Hashed VARCHAR(150)

# Product
productId SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL

# Orders
  orderId SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
# order_products 
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(orderId),
    product_id bigint REFERENCES products(productId)


----------------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------------
## **Database Schema**



 # products (
    productId SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
);
                                        Table "public.products"
  Column   |         Type          | Collation | Nullable |                   Default
-----------+-----------------------+-----------+----------+---------------------------------------------
 productid | integer               |           | not null | nextval('products_productid_seq'::regclass)
 name      | character varying(64) |           | not null |
 price     | integer               |           | not null |
Indexes:
    "products_pkey" PRIMARY KEY, btree (productid)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(productid)

# orders (
    orderId SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
                                      Table "public.orders"
 Column  |         Type          | Collation | Nullable |                 Default
---------+-----------------------+-----------+----------+-----------------------------------------
 orderid | integer               |           | not null | nextval('orders_orderid_seq'::regclass)
 status  | character varying(15) |           |          |
 user_id | bigint                |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (orderid)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(orderid)
# users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15),
    password_Hashed VARCHAR(150)
);

     Column      |          Type          | Collation | Nullable |              Default
-----------------+------------------------+-----------+----------+-----------------------------------
 id              | integer                |           | not null | nextval('users_id_seq'::regclass)
 name            | character varying(15)  |           |          |
 password_hashed | character varying(150) |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
# order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(orderId),
    product_id bigint REFERENCES products(productId)
);
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          |
 order_id   | bigint  |           |          |
 product_id | bigint  |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(orderid)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(productid)