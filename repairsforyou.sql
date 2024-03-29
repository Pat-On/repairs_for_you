-- FROM 09.07.2021 
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS buyers;
DROP TABLE IF EXISTS handyman;
DROP TABLE IF EXISTS postcodes;
DROP TABLE IF EXISTS areas;

CREATE TABLE handyman(
                        id serial PRIMARY KEY,
                        first_name varchar(30) NOT NULL,
                        last_name varchar(30) NOT NULL,
                        img varchar(255),
                        address json NOT NULL,
                        postcode char(12) NOT NULL,
                        email varchar(50) UNIQUE NOT NULL,						 
                        phone_number char(13) NOT NULL,
                        skills varchar[] NOT NULL,
                        bio varchar(1000) NOT NULL,
                        visible bool DEFAULT false,
                        date_added timestamptz DEFAULT CURRENT_DATE
                );
					
CREATE TABLE jobs(
                id serial PRIMARY KEY,
                client_name varchar(60) NOT NULL,
                client_email varchar NOT NULL,
                job_description varchar(500) NOT NULL,
                job_start_date date NOT NULL,
                handyman_id	integer REFERENCES handyman(id),
                date_created timestamptz DEFAULT CURRENT_DATE,
                current_status varchar NOT NULL DEFAULT 'Pending'
        );

CREATE TABLE postcodes(
        id serial PRIMARY KEY,
        postcode varchar(12) UNIQUE NOT NULL
	);       					

INSERT INTO handyman(id,first_name,last_name,address,postcode,email,phone_number,skills,bio)
			VALUES(0,'Anyone','Anyone','{"addressLineOne":"-","addressLineTwo":"-","city":"Coventry"}','-','-',00000000000,'{""}','-');					  
INSERT INTO handyman(first_name,last_name,address,postcode,email,phone_number,skills,bio)
			VALUES('Senait','Ekubai','{"addressLineOne":"1","addressLineTwo":"Street Name 1","city":"Coventry"}','CV1 1AA','senait.ekubai@senaitekubai.com',07123456789,'{"Painting","Decorating"}','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
INSERT INTO handyman(first_name,last_name,address,postcode,email,phone_number,skills,bio)
			VALUES('Patryk','Nowak','{"addressLineOne":"1","addressLineTwo":"Street Name 1","city":"Coventry"}','CV1 1AA','patryk_nowak@patryknowak.com',07123456789,'{"Plastering","Plumbing"}','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
INSERT INTO handyman(first_name,last_name,address,postcode,email,phone_number,skills,bio)
			VALUES('Michael','Biruk','{"addressLineOne":"1","addressLineTwo":"Street Name 1","city":"Coventry"}','CV1 1AA','michaelb@michaelbiruk.com',07123456789,'{"Electrical Work","Plastering","Plumbing"}','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				  



CREATE TABLE users (
    user_id          SERIAL PRIMARY KEY,
    first_name       VARCHAR(50)  NOT NULL,
    email            VARCHAR(50) UNIQUE NOT NULL,
	user_password VARCHAR(200),
	password_changed_at timestamp,
    user_role        VARCHAR(20),
password_reset_token   VARCHAR(200),
password_reset_expires  	timestamptz
);




-- OLD -----------------------------------------------------------------------------------

-- DROP TABLE IF EXISTS quotes;
-- DROP TABLE IF EXISTS reviews;
-- DROP TABLE IF EXISTS buyers;
-- DROP TABLE IF EXISTS handyman;
-- ​
-- CREATE TABLE handyman(id SERIAL PRIMARY KEY,
-- 					 first_name VARCHAR(30) NOT NULL,
-- 					 last_name VARCHAR(30) NOT NULL,
-- 					 img VARCHAR,
-- 					 address JSON NOT NULL,
-- 					 postcode CHAR(12) NOT NULL,
-- 					 email VARCHAR(50) UNIQUE NOT NULL,						 
-- 					 phone_number CHAR(13) NOT NULL,
-- 					 skills VARCHAR[] NOT NULL,
-- 					 bio VARCHAR(1000) NOT NULL,
-- 					 visible bool DEFAULT false
-- 				  );
				  
-- CREATE TABLE buyers(id SERIAL PRIMARY KEY,
-- 					 customer_name VARCHAR(60) NOT NULL,
-- 					 email VARCHAR(50) UNIQUE NOT NULL,
-- 					 telephone_number VARCHAR(13)
-- 				  );
				  
				  
			
-- CREATE TABLE reviews(id SERIAL PRIMARY KEY,
-- 				   	 buyer_id INT REFERENCES buyers(id),
-- 				     handyman_id INT REFERENCES handyman(id),
-- 					 review_body VARCHAR(500),
-- 					 rating INT DEFAULT 5
-- 				    );
					
-- CREATE TABLE quotes(
-- 					id serial PRIMARY KEY,
-- 					client_name varchar(60) NOT NULL,
-- 					client_email varchar NOT NULL,
-- 					job_description varchar(500) NOT NULL,
-- 					job_start_date date NOT NULL,
-- 					handyman_id	integer REFERENCES handyman(id)
-- 				);					
					  
-- INSERT INTO handyman(first_name,last_name,address,postcode,email,phone_number,skills,bio)
-- 			VALUES('Senait','Ekubai','{"addressLineOne":"1","addressLineTwo":"Street Name 1","city":"Coventry"}','CV1 1AA','senait.ekubai@senaitekubai.com',07123456789,'{"Painting","Decorating"}','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
-- INSERT INTO handyman(first_name,last_name,address,postcode,email,phone_number,skills,bio)
-- 			VALUES('Patryk','Nowak','{"addressLineOne":"1","addressLineTwo":"Street Name 1","city":"Coventry"}','CV1 1AA','patryk_nowak@patryknowak.com',07123456789,'{"Plastering","Plumbing"}','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
-- INSERT INTO handyman(first_name,last_name,address,postcode,email,phone_number,skills,bio)
-- 			VALUES('Michael','Biruk','{"addressLineOne":"1","addressLineTwo":"Street Name 1","city":"Coventry"}','CV1 1AA','michaelb@michaelbiruk.com',07123456789,'{"Electrical Work","Plastering","Plumbing"}','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
				  
-- INSERT INTO buyers(customer_name,email)
-- 			VALUES('customer1','costomer1@somewhere.com');				  
-- INSERT INTO buyers(customer_name,email)
-- 			VALUES('customer2','costomer2@somewhere.com');					  
-- INSERT INTO buyers(customer_name,email)
-- 			VALUES('customer3','costomer3@somewhere.com');  
					
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(2,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(3,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(1,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(2,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(3,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(1,3,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(2,3,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
-- INSERT INTO	reviews(buyer_id,handyman_id,review_body) VALUES(3,3,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');				
					  
-- ​INSERT INTO handyman(id,first_name,last_name,address,postcode,email,phone_number,skills,bio)
-- 			VALUES(0,'Anyone','Anyone','{"addressLineOne":"-","addressLineTwo":"-","city":"Coventry"}','-','-',00000000000,'{""}','-');

-- DROP TABLE IF EXISTS postcodes;
-- DROP TABLE IF EXISTS areas;
-- CREATE TABLE areas(
-- code varchar(5) NOT NULL PRIMARY KEY
-- 	);
-- CREATE TABLE postcodes(
-- postcode varchar(12) NOT NULL PRIMARY KEY,
-- area_code varchar REFERENCES areas(code)
-- 	);
-- INSERT INTO areas (code) VALUES('CV1');
-- INSERT INTO postcodes(postcode,area_code) VALUES('CV1 1AA','CV1');





---------------------------------------------------------

-- old---------------------------------------------------

-- -- TABLE CREATORS
-- CREATE TABLE addresses (
--     address_id       SERIAL PRIMARY KEY,
--     -- user address 
--     address1         VARCHAR(50),
--     district1         VARCHAR(40),
--     city1             VARCHAR(50),
--     postal_code1      VARCHAR(10),
--     -- offert address
--     address2         VARCHAR(50),
--     district2         VARCHAR(40),
--     city2             VARCHAR(50),
--     postal_code2      VARCHAR(10),

--     country          VARCHAR(50),
--     phone            VARCHAR(20),
--     last_update      timestamp
-- );



-- CREATE TABLE users (
--     user_id          SERIAL PRIMARY KEY,
--     first_name       VARCHAR(50)  NOT NULL,
--     email            VARCHAR(50) UNIQUE NOT NULL,
-- 	user_password VARCHAR(200),
-- 	password_changed_at timestamp,
--     user_role        VARCHAR(20),
-- password_reset_token   VARCHAR(200),
-- password_reset_expires  	timestamptz
-- );


-- CREATE TABLE users (
--     user_id          SERIAL PRIMARY KEY,
--     profile_picture VARCHAR(80), --IN FIRST ATTEMPT WE WILL USE LINK BUT LWE HAVE TO ALLOW USER TO UPLOAD PICTURES TO SERVER
--     first_name       VARCHAR(50)  NOT NULL,
--     last_name        VARCHAR(50)  NOT NULL,
--     email            VARCHAR(50) UNIQUE NOT NULL,
--     address_table    INTEGER REFERENCES addresses(address_id),

-- -- after authentication
--     activebool       BOOLEAN,
--     created_data     DATE,
--     last_update      timestamp,
--     user_role        VARCHAR(20),
--     user_password    VARCHAR(200)
-- );


-- -- WAY OF DOING QUERY TO ARRAY IN POSTGRES
-- -- https://stackoverflow.com/questions/11231544/check-if-value-exists-in-postgres-array/11231965

-- CREATE TABLE offers (
--     offer_id            SERIAL PRIMARY KEY,
--     handyman_id         INTEGER REFERENCES users(user_id) UNIQUE NOT NULL,
--     adressoffert        VARCHAR(50), -- we will need to modify it to exist in address table
--     images              text ARRAY, 
--     offert_description  VARCHAR(450),
--     skills              text ARRAY, 
--     sector              text ARRAY, 
--     contacts            VARCHAR(100) -- temporary but need to be connected to address for example phone and email from user
-- );

-- CREATE TABLE handyman (
-- handyman_id  SERIAL PRIMARY KEY,
--     first_name          VARCHAR(50), 
--     last_name           VARCHAR(50), 
--     images              VARCHAR(50),
--     address_offer        text ARRAY, 
--     postcode            VARCHAR(50), 
--     email               VARCHAR(50), 
--     phone_number        VARCHAR(50), 
--     skills              text ARRAY, 
--     bio                 VARCHAR(450),
--     visible             BOOLEAN DEFAULT FALSE
-- );



-- CREATE TABLE reviews (
--     review_id          SERIAL PRIMARY KEY,
--     buyer_id_ref        INTEGER REFERENCES users(user_id),
--     offert_id_ref       INTEGER REFERENCES offers(offer_id),
--     handyman_id_ref     INTEGER REFERENCES users(user_id),
--     review_msg          VARCHAR(250),
--     rating              numeric CHECK (rating BETWEEN 1 AND 5)
-- );

-- -- CREATE TABLE booked_offers (
-- --     booked_offer_id               SERIAL PRIMARY KEY,
-- -- );

-- -- ***********************************************************************
-- -- DATA
-- -- usser after creting we need to add address 


-- -- CREATE TABLE booked_offers (
-- --     booked_offer_id               SERIAL PRIMARY KEY,
-- -- );

-- -- ***********************************************************************
-- -- DATA
-- -- usser after creting we need to add address 

-- -- HANDYMANS
-- INSERT INTO users (user_id, profile_picture, first_name, last_name, email, address_table, created_data, last_update, user_role, user_password)
-- VALUES( 1, 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', 'Handyman_1', 'SURNAME_1', 'email1@c.uk', NULL, '2021-03-01', NULL, 'handyman', 'password');

-- INSERT INTO users (user_id, profile_picture, first_name, last_name, email, address_table, created_data, last_update, user_role, user_password)
-- VALUES( 2, 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', 'Handyman_2', 'SURNAME_2', 'email2@c.uk', NULL, '2021-04-01', NULL, 'handyman', 'password');

-- INSERT INTO users (user_id, profile_picture, first_name, last_name, email, address_table, created_data, last_update, user_role, user_password)
-- VALUES( 3, 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', 'Handyman_3', 'SURNAME_3', 'email3@c.uk', NULL, '2021-05-01', NULL, 'handyman', 'password');

-- INSERT INTO users (user_id, profile_picture, first_name, last_name, email, address_table, created_data, last_update, user_role, user_password)
-- VALUES( 4, 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', 'Handyman_4', 'SURNAME_4', 'email4@c.uk', NULL, '2021-06-01', NULL, 'handyman', 'password');

-- -- BUYERS

-- INSERT INTO users (user_id, profile_picture, first_name, last_name, email, address_table, created_data, last_update, user_role, user_password)
-- VALUES( 5, 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', 'Buyer_1', 'SURNAME_4', 'email5@c.uk', NULL, '2021-01-01', NULL, 'handyman', 'password');

-- INSERT INTO users (user_id, profile_picture, first_name, last_name, email, address_table, created_data, last_update, user_role, user_password)
-- VALUES( 6, 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', 'Buyer_1', 'SURNAME_4', 'email6@c.uk', NULL, '2021-02-01', NULL, 'handyman', 'password');

-- INSERT INTO users (user_id, profile_picture, first_name, last_name, email, address_table, created_data, last_update, user_role, user_password)
-- VALUES( 7, 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', 'Buyer_1', 'SURNAME_4', 'email7@c.uk', NULL, '2021-03-01', NULL, 'handyman', 'password');

-- INSERT INTO users (user_id, profile_picture, first_name, last_name, email, address_table, created_data, last_update, user_role, user_password)
-- VALUES( 8, 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg', 'Buyer_1', 'SURNAME_4', 'email8@c.uk', NULL, '2021-04-01', NULL, 'handyman', 'password');

-- -- HANDYMAN OFFERT

-- INSERT INTO offers (offer_id, handyman_id, adressoffert, images, offert_description, skills, sector, contacts) 
--             VALUES (1, 1, 'Birmingham - placeholder', '{"https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg"}', 
--             '1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
--             '{"Electric Installation", "Plastering"}', '{"sector1", "sector2"}', 'Contacts - placeholder');

-- INSERT INTO offers (offer_id, handyman_id, adressoffert, images, offert_description, skills, sector, contacts) 
--             VALUES (2, 2, 'Birmingham - placeholder', '{"https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg"}', 
--             '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
--             '{"Electric Installation", "Plastering"}', '{"sector1", "sector2"}', 'Contacts - placeholder');

-- INSERT INTO offers (offer_id, handyman_id, adressoffert, images, offert_description, skills, sector, contacts) 
--             VALUES (3, 3, 'Birmingham - placeholder', '{"https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg"}', 
--             '3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
--             '{"Electric Installation", "Plastering"}', '{"sector1", "sector2"}', 'Contacts - placeholder');

-- INSERT INTO offers (offer_id, handyman_id, adressoffert, images, offert_description, skills, sector, contacts) 
--             VALUES (4, 4, 'Birmingham - placeholder', '{"https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg"}',
--             '4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
--             '{"Electric Installation", "Plastering"}', '{"sector1", "sector2"}', 'Contacts - placeholder');

-- -- reviews

-- INSERT INTO reviews (review_id, buyer_id_ref, offert_id_ref, handyman_id_ref, rating, review_msg )
--             VALUES (1, 5, 1, 1, 5, '1A t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse');

-- INSERT INTO reviews (review_id, buyer_id_ref, offert_id_ref, handyman_id_ref, rating, review_msg )
--             VALUES (2, 6, 2, 2, 3, '2A t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse');

-- INSERT INTO reviews (review_id, buyer_id_ref, offert_id_ref, handyman_id_ref, rating, review_msg )
--             VALUES (3, 7, 3, 3, 4, '3A t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse');

-- INSERT INTO reviews (review_id, buyer_id_ref, offert_id_ref, handyman_id_ref, rating, review_msg )
--             VALUES (4, 8, 4, 4, 1, '4A t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse');



-- INSERT INTO reviews (review_id, buyer_id_ref, offert_id_ref, handyman_id_ref, rating, review_msg )
--             VALUES (5, 5, 1, 1, 5, '1B t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse');

-- INSERT INTO reviews (review_id, buyer_id_ref, offert_id_ref, handyman_id_ref, rating, review_msg )
--             VALUES (6, 6, 2, 2, 3, '2B t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse');

-- INSERT INTO reviews (review_id, buyer_id_ref, offert_id_ref, handyman_id_ref, rating, review_msg )
--             VALUES (7, 7, 3, 3, 4, '3B t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse');

-- INSERT INTO reviews (review_id, buyer_id_ref, offert_id_ref, handyman_id_ref, rating, review_msg )
--             VALUES (8, 8, 4, 4, 1, '4B t dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse');


-- -- ADDRESSES
-- INSERT INTO addresses(address_id, address1, district1, city1, postal_code1, address2, district2, city2, postal_code2, country, phone, last_update)
--         VALUES(1, 'Street 1 Flat 1', 'West Midlands', 'Birmingham', 'b11-1bb', 'Streed Addres', 'West Midlands district2',  'Birmingham2', 'b11-1bb', 'England', '0711 2552 0291', NULL);

-- INSERT INTO addresses(address_id, address1, district1, city1, postal_code1, address2, district2, city2, postal_code2, country, phone, last_update)
--         VALUES(2, 'Street 2 Flat 2', 'West Midlands', 'Birmingham', 'b20-1bb', 'Streed Addres', 'West Midlands district2', 'Birmingham2', 'b21-1bb', 'England', '0711 2552 0291', NULL);

-- INSERT INTO addresses(address_id, address1, district1, city1, postal_code1, address2, district2, city2, postal_code2, country, phone, last_update)
--         VALUES(3, 'Street 3 Flat 3', 'West Midlands', 'Birmingham', 'b30-1bb', 'Streed Addres', 'West Midlands district2', 'Birmingham2', 'b32-1bb', 'England', '0711 2552 0291', NULL);

-- INSERT INTO addresses(address_id, address1, district1, city1, postal_code1, address2, district2, city2, postal_code2, country, phone, last_update)
--         VALUES(4, 'Street 4 Flat 4', 'West Midlands', 'Birmingham', 'b40-1bb', 'Streed Addres', 'West Midlands district2', 'Birmingham2', 'b42-1bb', 'England', '0711 2552 0291', NULL);

-- INSERT INTO addresses(address_id, address1, district1, city1, postal_code1, address2, district2, city2, postal_code2, country, phone, last_update)
--         VALUES(5, 'Street 5 Flat 5', 'West Midlands', 'Birmingham', 'b50-1bb', 'Streed Addres', 'West Midlands district2', 'Birmingham2','b51-1bb', 'England', '0711 2552 0291', NULL);

-- INSERT INTO addresses(address_id, address1, district1, city1, postal_code1, address2, district2, city2, postal_code2, country, phone, last_update)
--         VALUES(6, 'Street 6 Flat 6', 'West Midlands', 'Birmingham', 'b60-1bb', 'Streed Addres', 'West Midlands district2', 'Birmingham2', 'b61-1bb', 'England', '0711 2552 0291', NULL);

-- INSERT INTO addresses(address_id, address1, district1, city1, postal_code1, address2, district2, city2, postal_code2, country, phone, last_update)
--         VALUES(7, 'Street 7 Flat 7', 'West Midlands', 'Birmingham', 'b70-1bb', 'Streed Addres', 'West Midlands district2', 'Birmingham2', 'b71-1bb', 'England', '0711 2552 0291', NULL);

-- INSERT INTO addresses(address_id, address1, district1, city1, postal_code1, address2, district2, city2, postal_code2, country, phone, last_update)
--         VALUES(8, 'Street 8 Flat 8', 'West Midlands', 'Birmingham', 'b80-1bb', 'Streed Addres', 'West Midlands district2', 'Birmingham2', 'b81-1bb', 'England', '0711 2552 0291', NULL);

-- -- updating user account - adding address reference

-- UPDATE users SET address_table = 1 WHERE user_id = 1;
-- UPDATE users SET address_table = 2 WHERE user_id = 2;
-- UPDATE users SET address_table = 3 WHERE user_id = 3;
-- UPDATE users SET address_table = 4 WHERE user_id = 4;
-- UPDATE users SET address_table = 5 WHERE user_id = 5;
-- UPDATE users SET address_table = 6 WHERE user_id = 6;
-- UPDATE users SET address_table = 7 WHERE user_id = 7;
-- UPDATE users SET address_table = 8 WHERE user_id = 8;