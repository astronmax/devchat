ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'none';
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS devchat_db;
USE devchat_db;

DROP TABLE IF EXISTS User;
CREATE TABLE User (
    `UserID` int primary key auto_increment not null,
    `name` varchar(45),
    `password` varchar(64)
);

DROP TABLE IF EXISTS `Group`;
CREATE TABLE `Group` (
    `GroupID` int primary key auto_increment not null,
    `name` varchar(45)
);

DROP TABLE IF EXISTS User_Group;
CREATE TABLE User_Group (
    `user` int not null,
    FOREIGN KEY (`user`) REFERENCES User(`UserID`),

    `group` int not null,
    FOREIGN KEY (`group`) REFERENCES `Group`(`GroupID`) 
);

DROP TABLE IF EXISTS GroupMessage;
CREATE TABLE GroupMessage (
    `GroupMessageID` int primary key auto_increment not null,
    
    `author` int not null,
    FOREIGN KEY (`author`) REFERENCES User(`UserID`),

    `group` int not null,
    FOREIGN KEY (`group`) REFERENCES `Group`(`GroupID`),

    `body` varchar(45)
);

DROP TABLE IF EXISTS DirectMessage;
CREATE TABLE DirectMessage (
    `DirectMessageID` int primary key auto_increment not null,
    
    `source` int not null,
    FOREIGN KEY (`source`) REFERENCES User(`UserID`),

    `destination` int not null,
    FOREIGN KEY (`destination`) REFERENCES User(`UserID`),

    `body` varchar(45)
);
