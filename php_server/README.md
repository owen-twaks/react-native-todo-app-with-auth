Please follow the following instructions in order to run this project

1.Please install xampp to your local machine;
2.Please copy php_server folder to your xampp folder/htdocs;
3.Please run the following query on your local database in order to create the database and tables needed;

CREATE DATABASE mytodo;
CREATE TABLE users (
        id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        firstname varchar(255) NOT NULL,
        lastname varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        avatar varchar(255) DEFAULT NULL,
        password varchar(255) NOT NULL
    );
CREATE TABLE tasks (
        id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name varchar(50) NOT NULL
    );

4. Start your web server and database instance from your xampp program
5. Here are all the api endpoints that are accessible from this api

-> GET: http://127.0.01/php_server/api/task/read.php
-> POST: http://127.0.01/php_server/api/task/create.php 
-> DELETE: http://127.0.01/php_server/api/task/delete.php
-> PUT: http://127.0.01/php_server/api/task/update.php
-> POST: http://127.0.01/php_server/api/user/register_user.php
-> GET: http://127.0.01/php_server/api/user/get_user.php?email=${data.email}&password=${data.password}
-> PUT: http://127.0.01/php_server/api/user/update_avatar.php
