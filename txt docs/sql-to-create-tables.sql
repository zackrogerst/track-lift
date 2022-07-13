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
VALUES ('1','Squat', '225', '3', '8', '01/01/2022'),
('1','Squat', '205', '10', '8', '01/05/2022'),
('1','Squat', '205', '11', '8', '01/08/2022'),
('1','Squat', '215', '8', '8', '01/10/2022'),
('1','Squat', '210', '7', '8', '01/13/2022'),
('1','Squat', '225', '4', '8', '01/15/2022'),
('1','Squat', '235', '2', '8', '01/17/2022'),
('1','Squat', '225', '3', '8', '01/21/2022'),
('1','Squat', '225', '3', '8', '01/26/2022'),
('1','Squat', '225', '2', '8', '01/29/2022'),
('1','Squat', '215', '6', '8', '02/01/2022'),
('1','Squat', '245', '1', '8', '02/03/2022'),
('1','Squat', '225', '4', '8', '02/07/2022'),
('1','Squat', '225', '4', '8', '02/10/2022'),
('1','Squat', '235', '3', '8', '02/12/2022'),
('1','Squat', '225', '5', '8', '02/15/2022'),
('1','Squat', '245', '2', '8', '02/20/2022'),
('1','Squat', '255', '1', '8', '02/22/2022'),
('1','Squat', '260', '1', '8', '02/27/2022');



INSERT INTO lifts (user_id, lift_name, weight, reps, rpe, add_date)
VALUES ('1','Bench', '125', '3', '8', '01/02/2022'),
('1','Bench', '105', '10', '8', '01/06/2022'),
('1','Bench', '105', '11', '8', '01/07/2022'),
('1','Bench', '115', '8', '8', '01/11/2022'),
('1','Bench', '110', '7', '8', '01/14/2022'),
('1','Bench', '125', '4', '8', '01/16/2022'),
('1','Bench', '135', '2', '8', '01/18/2022'),
('1','Bench', '125', '3', '8', '01/22/2022'),
('1','Bench', '125', '3', '8', '01/27/2022'),
('1','Bench', '125', '2', '8', '01/30/2022'),
('1','Bench', '115', '6', '8', '02/02/2022'),
('1','Bench', '145', '1', '8', '02/04/2022'),
('1','Bench', '125', '4', '8', '02/08/2022'),
('1','Bench', '125', '4', '8', '02/11/2022'),
('1','Bench', '135', '3', '8', '02/13/2022'),
('1','Bench', '125', '5', '8', '02/15/2022'),
('1','Bench', '145', '2', '8', '02/21/2022'),
('1','Bench', '155', '1', '8', '02/23/2022'),
('1','Bench', '160', '1', '8', '02/28/2022');