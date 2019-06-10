DROP DATABASE IF EXISTS ng_gardeontrueque_db;

CREATE DATABASE ng_gardeontrueque_db;
USE ng_gardeontrueque_db;

CREATE TABLE users(
    user_id INT(11) NOT NULL auto_increment,
    uid VARCHAR(30) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    userfullname VARCHAR(255) DEFAULT NULL,
    usercedula VARCHAR(10) DEFAULT NULL,
    useremail VARCHAR(255) NOT NULL,
    useraddress VARCHAR(255) DEFAULT NULL,
    userphone VARCHAR(10) DEFAULT NULL,
    userphone2 VARCHAR(10) DEFAULT NULL,
    userfacebook VARCHAR(255) DEFAULT NULL,
    userpassword VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, uid)
);

DESCRIBE users;

source anuncio.sql;
source planta.sql;
source cambio.sql;