-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY NOT NULL, 
--     id VARCHAR(255) NOT NULL,
--     name VARCHAR(255) NOT NULL, 
--     email VARCHAR(255) NOT NULL, 
--     password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE lifts (
--     lift_id SERIAL PRIMARY KEY NOT NULL,
--     user_id INTEGER references users(user_id) NOT NULL,
--     lift_name VARCHAR(100) NOT NULL, 
--     weight INTEGER NOT NULL,
--     reps INTEGER NOT NULL,
--     rpe INTEGER NOT NULL,
--     add_date VARCHAR(10) NOT NULL,
-- );

-- INSERT INTO users (id, name, email, password)
-- VALUES ('1657295155237', 'Admin', '2@2', '$2b$10$elEg92E.y5pTH7Ro3hqSAuinPKoq4CQ77Y7C0inyP.XfAYzJ7LkYa');


-- DELETE FROM users
-- WHERE email = 'dev@dev';


-- UPDATE users
-- SET name = 'Admin',
-- email = '2@2'
-- WHERE user_id = 1;


-- SELECT * FROM users;






INSERT INTO lifts (user_id, lift_name, weight, reps, rpe, add_date)
VALUES ('1','Squat', '225', '3', '8', '1-1-2022'),
('1','Squat', '205', '10', '8', '1-5-2022'),
('1','Squat', '205', '11', '8', '1-8-2022'),
('1','Squat', '215', '8', '8', '1-10-2022'),
('1','Squat', '210', '7', '8', '1-13-2022'),
('1','Squat', '225', '4', '8', '1-15-2022'),
('1','Squat', '235', '2', '8', '1-17-2022'),
('1','Squat', '225', '3', '8', '1-21-2022'),
('1','Squat', '225', '3', '8', '1-26-2022'),
('1','Squat', '225', '2', '8', '1-29-2022'),
('1','Squat', '215', '6', '8', '2-1-2022'),
('1','Squat', '245', '1', '8', '2-3-2022'),
('1','Squat', '225', '4', '8', '2-7-2022'),
('1','Squat', '225', '4', '8', '2-10-2022'),
('1','Squat', '235', '3', '8', '2-12-2022'),
('1','Squat', '225', '5', '8', '2-15-2022'),
('1','Squat', '245', '2', '8', '2-20-2022'),
('1','Squat', '255', '1', '8', '2-22-2022'),
('1','Squat', '260', '1', '8', '2-27-2022');



INSERT INTO lifts (user_id, lift_name, weight, reps, rpe, add_date)
VALUES ('1','Bench', '125', '3', '8', '1-2-2022'),
('1','Bench', '105', '10', '8', '1-6-2022'),
('1','Bench', '105', '11', '8', '1-7-2022'),
('1','Bench', '115', '8', '8', '1-11-2022'),
('1','Bench', '110', '7', '8', '1-14-2022'),
('1','Bench', '125', '4', '8', '1-16-2022'),
('1','Bench', '135', '2', '8', '1-18-2022'),
('1','Bench', '125', '3', '8', '1-22-2022'),
('1','Bench', '125', '3', '8', '1-27-2022'),
('1','Bench', '125', '2', '8', '1-30-2022'),
('1','Bench', '115', '6', '8', '2-2-2022'),
('1','Bench', '145', '1', '8', '2-4-2022'),
('1','Bench', '125', '4', '8', '2-8-2022'),
('1','Bench', '125', '4', '8', '2-11-2022'),
('1','Bench', '135', '3', '8', '2-13-2022'),
('1','Bench', '125', '5', '8', '2-15-2022'),
('1','Bench', '145', '2', '8', '2-21-2022'),
('1','Bench', '155', '1', '8', '2-23-2022'),
('1','Bench', '160', '1', '8', '2-28-2022');


INSERT INTO lifts (user_id, lift_name, weight, reps, rpe, add_date)
VALUES ('1','Deadlift', '325', '3', '8', '1-2-2022'),
('1','Deadlift', '305', '10', '8', '1-6-2022'),
('1','Deadlift', '305', '11', '8', '1-7-2022'),
('1','Deadlift', '315', '8', '8', '1-11-2022'),
('1','Deadlift', '310', '7', '8', '1-14-2022'),
('1','Deadlift', '325', '4', '8', '1-16-2022'),
('1','Deadlift', '335', '2', '8', '1-18-2022'),
('1','Deadlift', '325', '3', '8', '1-22-2022'),
('1','Deadlift', '325', '3', '8', '1-27-2022'),
('1','Deadlift', '325', '2', '8', '1-30-2022'),
('1','Deadlift', '315', '6', '8', '2-2-2022'),
('1','Deadlift', '345', '1', '8', '2-4-2022'),
('1','Deadlift', '325', '4', '8', '2-8-2022'),
('1','Deadlift', '325', '4', '8', '2-11-2022'),
('1','Deadlift', '335', '3', '8', '2-13-2022'),
('1','Deadlift', '325', '5', '8', '2-15-2022'),
('1','Deadlift', '345', '2', '8', '2-21-2022'),
('1','Deadlift', '355', '1', '8', '2-23-2022'),
('1','Deadlift', '360', '1', '8', '2-28-2022');