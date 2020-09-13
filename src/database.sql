DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id  INTEGER PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL
) ENGINE InnoDB;

DROP TABLE IF EXISTS files;
CREATE TABLE files (
  id  INTEGER PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  extention varchar(255) NOT NULL,
  mimetype varchar(255) NOT NULL,
  size INT NOT NULL,
  filePath varchar(255) NOT NULL,
  data date
);
