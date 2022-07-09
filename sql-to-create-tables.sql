-- CREATE TABLE users (
-- 	user_id SERIAL PRIMARY KEY NOT NULL, 
-- 	name VARCHAR(255) NOT NULL, 
-- 	email VARCHAR(255) NOT NULL, 
-- 	password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE lifts (
-- 	lift_id INTEGER PRIMARY KEY NOT NULL,
-- 	user_id INTEGER references users(user_id) NOT NULL,
-- 	lift_name VARCHAR(100) NOT NULL, 
-- 	weight INTEGER NOT NULL,
-- 	reps INTEGER NOT NULL,
-- 	rpe INTEGER NOT NULL,
-- 	add_date VARCHAR(10) NOT NULL,
-- 	lift_notes VARCHAR(255)
-- );

-- INSERT INTO users (name, email, password)
-- VALUES ('admin', 'admin@tracklift', '$2b$10$elEg92E.y5pTH7Ro3hqSAuinPKoq4CQ77Y7C0inyP.XfAYzJ7LkYa');

SELECT * FROM users;

UPDATE users
SET name = 'Admin' 
email = '2@2'
WHERE user_id = 1;