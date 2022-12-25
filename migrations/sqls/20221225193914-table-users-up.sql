
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15),
    password_Hashed VARCHAR(150)
);