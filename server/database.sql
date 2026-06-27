CREATE DATABASE food_ordered;

CREATE TABLE variants (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_food VARCHAR(200) NOT NULL,
    food_image VARCHAR(200) NOT NULL,
    price_total VARCHAR(30) NOT NULL,
    quantity VARCHAR(30) NOT NULL
);