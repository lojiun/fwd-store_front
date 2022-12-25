/* Replace with your SQL commands */

CREATE TABLE orders (
    orderId SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
