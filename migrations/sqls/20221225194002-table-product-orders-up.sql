/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(orderId),
    product_id bigint REFERENCES products(productId)
);