# FS1030 Invididual Project
This web application features a Resume and Portfolio hub for Admin users of Erin Cameron's professional website through which an Admin may:
1. Login
2. View Resume items
3. Update Resume items
4. Add Resume items
5. Delete Resume items
6. View Portfolio items
7. Update Portfolio items
8. Add Portfolio items
9. Delete Portfolio items

```
NodeJS-ExpressJS-MYSQL stack
```

## Tools Used
- XAMPP 
- DBeaver
- EJS is used as a templating engine
- MySQL
- Visual Studio Code

## Modules Used
- express - was used to handle routing and process requests from the client
- express-fileupload - middleware
- body-parser - parses incoming requests from the client
- mysql - node JS driver for MySQL
- ejs - templating engine to help render HTML on the UI end
- req-flash - sends flash messages
- nodemon - watches for changes and automatically restarts the server

## Prerequisites
You need Node.js to install the various packages used in this application.

- Install node package manager
```
npm install
```

- Install dependencies
```
npm install express express-fileupload body-parser mysql ejs req-flash --save
```

- Install nodemon
```
npm install nodemon -g
```

- Start the app with:
```
nodemon app.js
```



## IFD, ER Diagrams & Abstract Code
IFD in repo as PDF file under name "Information Flow Diagram"
ER Diagram in repo as PDF file under name "Entity Relationship Diagram"
Abstract Code in repo as PDF file under "Abstract Code"

## Steps to Run Project
- Open XAMPP and Start
    - Once your virtual system (LINUX operating system running on top of your regular operating system) is operating under a new IP address, enable all Services
    - Enable all Networks and make sure you have a network mapped from localhost:3600 -> 3306 (Over SSH)
- Open DBeaver and create a connection through MariaDB
    - Create a connection with Server Host: localhost, Port: 3600, Username: root, Password: empty
- Open Terminal and navigate to the directory where the project is
    - Run the command nodemon app.js
- Once everything is up and running, navigate to localhost:5000 in your browser
- At this point, you will be at the admin login page - use the following credentials to log in
    - Username:
    - Password: 
- Attempt to Create Read Update and Delete resume and portfolio items


## Main Items of Project
- Admin Login Page
    - localhost:5000/
    - localhost:5000/login
- Home Page
    - localhost:5000/index
- Add Resume Page
    - localhost:5000/addresume
- View Resume Page
    - localhost:5000/resume
- Edit Resume Page
    - localhost:5000/editresume/:resume_id
- Delete Resume Page
    - localhost:5000/deleteresume/:resume_id
- Add Portfolio Page
    - localhost:5000/addportfolio
- View Portfolio Page
    - localhost:5000/portfolio
- Edit Portfolio Page
    - localhost:5000/editportfolio/:portfolio_id
- Delete Portfolio Page
    - localhost:5000/deleteportfolio/:portfolio_id



## MySQL Script

### General setup
Create a database 

```
CREATE DATABASE individual_project;
```

### Resume Table 
Set individual_project database as default

```
USE individual_project;
```

```
SHOW tables;
```

Create a table to the specifications of the project

```
CREATE TABLE IF NOT EXISTS `resume` (
  `resume_id` int(5) NOT NULL AUTO_INCREMENT,
  `position` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`resume_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
```

This command is run to create a new user for the node app

```
USE mysql;
CREATE USER 'nodeuser'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'nodeuser'@'localhost';
flush privileges;
```

### Portfolio Table

Set individual_project database as default

```
USE individual_project;
```

```
SHOW tables;
```

Create a table to the specifications of the project

```
CREATE TABLE IF NOT EXISTS `portfolio` (
  `portfolio_id` int(5) NOT NULL AUTO_INCREMENT,
  `project` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `portfolio_img` varchar(255) NOT NULL,
  PRIMARY KEY (`portfolio_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
```
