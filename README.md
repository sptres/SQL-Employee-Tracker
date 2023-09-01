# SQL-Employee-Tracker
User can use the terminal application to view, add, and update departments, roles, employees, and managers. 

## Description
With the Employee Tracker terminal application user is allowed to view, add, and update all departments, roles, and employees.

## Demo
https://drive.google.com/file/d/1NnXWHNNg4UICJmOCbtZYTMMfUKc5Y46j/view

## Installation
1. Download the github repo into local computer, manipulate seeds.sql file in order to fit your management.
2. Download all dependencies by typing 'npm install' in the terminal, make sure node, and mysql are downloaded and set up properly.     "dependencies": {
        "console.table": "^0.10.0",
        "express": "^4.17.1",
        "inquirer": "^8.2.6",
        "mysql2": "^3.6.0"
    }
3. Once all dependencies have been downloaded, start the application by typing 'node index.js' in the terminal.

## Mysql help
If you are unfamiliar how to run mysql commands in order to create and seed the database properly follow the instruction below.
1. mysql -u root -p (log into your mysql account)
2. source db/schema.sql (create database)
3. source db/seeds.sql (seed the database, the seeding are default, make sure to manipulate the seedings to fit into your employee management information)
4. exit (exit mysql and go back to main terminal)
5. node index.js (start the terminal application)

## Built With
The Employee Tracker was built with Javascript, inquirer, nodejs, mysql, express.

## Bugs && Issues
To report any bugs & issues with the application please email shawnpark2397@gmail.com

