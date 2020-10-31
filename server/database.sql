CREATE TABLE IF NOT EXISTS users (
	username  varchar(200) PRIMARY KEY NOT NULL,
	password varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS Petowner (
    username varchar(200) REFERENCES users(username)
    PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS Pet (
	pname  varchar(200),
	username varchar(200) REFERENCES Petowner(username),
	password varchar(200) NOT NULL,
	profile varchar(200),
	category varchar(50) REFERENCES PetCategory(category),
	special varchar(200),
	PRIMARY KEY (pname, username)
);

CREATE TABLE IF NOT EXISTS PetCategory (
    category varchar(200) PRIMARY KEY NOT NULL
);

