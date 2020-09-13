-- DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS=0; DROP TABLE users; SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE users (
  id  INTEGER PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL UNIQUE,
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

DROP TABLE IF EXISTS tokens;
CREATE TABLE tokens (
  id  INTEGER PRIMARY KEY AUTO_INCREMENT,
  refresh INTEGER,
  payload varchar(255) NOT NULL
);

ALTER TABLE tokens ADD CONSTRAINT pkTokensRefresh FOREIGN KEY (refresh) REFERENCES users (id) ON DELETE RESTRICT;
