-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY NOT NULL, 
--     id VARCHAR(255) NOT NULL,
--     name VARCHAR(255) NOT NULL, 
--     email VARCHAR(255) NOT NULL, 
--     password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE lifts (
-- 	lift_id SERIAL PRIMARY KEY NOT NULL,
-- 	user_id INTEGER references users(user_id) NOT NULL,
-- 	lift_name VARCHAR(100) NOT NULL, 
-- 	weight INTEGER NOT NULL,
-- 	reps INTEGER NOT NULL,
-- 	rpe INTEGER NOT NULL,
-- 	add_date VARCHAR(10) NOT NULL,
-- 	lift_notes VARCHAR(255)
-- );

-- INSERT INTO users (id, name, email, password)
-- VALUES ('1657295155237', 'name', '2@2', '$2b$10$elEg92E.y5pTH7Ro3hqSAuinPKoq4CQ77Y7C0inyP.XfAYzJ7LkYa');

-- SELECT * FROM users;


-- DELETE FROM users
-- WHERE email = 'dev@dev';


-- UPDATE users
-- SET name = '2',
-- email = '2@2'
-- WHERE user_id = 1;