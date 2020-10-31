CREATE TABLE IF NOT EXISTS users (
	username  varchar(200) PRIMARY KEY NOT NULL,
	password varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS pet_owner (
    username varchar(200) REFERENCES users(username)
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS pet (
	pname  varchar(200),
	username varchar(200) REFERENCES pet_owner(username),
	password varchar(200) NOT NULL,
	profile varchar(200),
	category varchar(50) REFERENCES pet_category(category),
	special varchar(200),
	PRIMARY KEY (pname, username)
);

CREATE TABLE IF NOT EXISTS pet_category (
    category varchar(200) PRIMARY KEY NOT NULL
);
