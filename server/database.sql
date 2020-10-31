/* To enforce covering constraint on admins and users */
CREATE TABLE IF NOT EXISTS pcs_admins (
	username varchar(200) PRIMARY KEY NOT NULL,
	password varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
	username varchar(200) PRIMARY KEY NOT NULL,
	password varchar(200) NOT NULL,
	name varchar(200),
	profile varchar(200)
);

CREATE TABLE IF NOT EXISTS pet_owners (
	username varchar(200) PRIMARY KEY NOT NULL REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS care_takers (
	username varchar(200) PRIMARY KEY NOT NULL REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS base_prices (
	category VARCHAR(200) PRIMARY KEY NOT NULL,
	price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS pets (
	username varchar(200) REFERENCES pet_owners(username) ON DELETE CASCADE,
	pname varchar(200) NOT NULL,
	profile text,
	category varchar(200) REFERENCES base_prices(category),
	special_requirements varchar(200),
	PRIMARY KEY (username, pname)
);

CREATE TABLE IF NOT EXISTS availabilities (
	username varchar(200) NOT NULL REFERENCES care_takers(username),
	start_date date NOT NULL,
	end_date date NOT NULL CHECK (start_date <= end_date),
	category varchar(200) REFERENCES base_prices(category),
	price int,
	PRIMARY KEY(username, start_date, end_date, category)
);

CREATE TABLE IF NOT EXISTS bids (
	start_date date,
	end_date date,
	category varchar(50),
	pname varchar(50) REFERENCES pets(pname),
	bid_start_date date NOT NULL,
   	bid_end_date date NOT NULL,
	review varchar,
	rating int CHECK(
		(rating IS NULL)
		OR (
			rating >= 0
			AND rating <= 5
		)
	),
	is_successful BOOLEAN NOT NULL,
	FOREIGN KEY (start_date, end_date, category) REFERENCES availabilities(start_date, end_date, category),
	CHECK ((bid_end_date <= end_date) AND (bid_start_date >= start_date) AND (bid_start_date <= bid_end_date)),
	PRIMARY KEY (start_date, end_date, category, pname)
);


CREATE TABLE IF NOT EXISTS monthly_summary (
	ctname varchar(50) REFERENCES care_takers (username) ON DELETE cascade,
	year INT CHECK(year >= 0),
	month INT CHECK(
		month >= 1
		AND month <= 12
	),
	pet_days INT CHECK(pet_days >= 0),
	salary INT CHECK(salary >= 0),
	PRIMARY KEY(ctname, year, month)
);

CREATE TABLE IF NOT EXISTS leaves (
	username varchar(200) REFERENCES care_takers(username),
	leave_date date NOT NULL
);