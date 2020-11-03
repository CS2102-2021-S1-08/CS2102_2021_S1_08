CREATE TABLE IF NOT EXISTS pcs_admins (
	username VARCHAR(200) PRIMARY KEY,
	password VARCHAR(200) NOT NULL
);
CREATE TABLE IF NOT EXISTS users (
	username VARCHAR(200) PRIMARY KEY,
	password VARCHAR(200) NOT NULL,
	name VARCHAR(200),
	profile VARCHAR(200)
);
CREATE VIEW accounts AS
	SELECT username, password FROM pcs_admins
	UNION
	SELECT username, password FROM users;
-- Covering and overlapping constraints satisfied
CREATE TABLE IF NOT EXISTS pet_owners (
	username VARCHAR(200) PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE
);
-- Covering constraint satisfied
-- No overlapping constraint
CREATE TABLE IF NOT EXISTS full_timers (
	username VARCHAR(200) PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE,
);
CREATE TABLE IF NOT EXISTS part_timers(
	username VARCHAR(200) PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE,
);
CREATE VIEW care_takers AS
	SELECT username FROM full_timers
	UNION
	SELECT username FROM part_timers;
CREATE TABLE IF NOT EXISTS base_prices (
	category VARCHAR(200) PRIMARY KEY,
	price INT NOT NULL
);
CREATE TABLE IF NOT EXISTS pets (
	poname VARCHAR(200) REFERENCES pet_owners(username) ON DELETE CASCADE,
	pname VARCHAR(200),
	profile VARCHAR(200),
	category varchar(200) REFERENCES base_prices(category) NOT NULL,
	special_requirements VARCHAR(200),
	PRIMARY KEY (poname, pname)
);
CREATE TABLE IF NOT EXISTS availabilities (
	username VARCHAR(200) REFERENCES care_takers(username) ON DELETE CASCADE,
	start_date DATE,
	end_date DATE CHECK (start_date <= end_date),
	category VARCHAR(200) REFERENCES base_prices(category),
	daily_price INT,
	PRIMARY KEY(username, start_date, end_date, category)
);
CREATE TABLE IF NOT EXISTS bids (
	start_date DATE,
	end_date DATE,
	category VARCHAR(200) REFERENCES base_prices(category) NOT NULL,
	poname VARCHAR(50),
	pname VARCHAR(50),
	ctuname VARCHAR(50),
	bid_start_date DATE NOT NULL,
	bid_end_date DATE NOT NULL,
	review VARCHAR,
	rating INT CHECK(
		(rating IS NULL)
		OR (
			rating >= 0
			AND rating <= 5
		)
	),
	is_successful BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (poname, pname) REFERENCES pets (poname, pname),
	FOREIGN KEY (ctuname, start_date, end_date, category) REFERENCES availabilities(username, start_date, end_date, category),
	PRIMARY KEY (
		start_date,
		end_date,
		category,
		poname,
		pname,
		ctuname
	),
	CHECK (poname <> ctuname),
	CHECK (
		(bid_end_date <= end_date)
		AND (bid_start_date >= start_date)
		AND (bid_start_date <= bid_end_date)
	)
);
CREATE TABLE IF NOT EXISTS monthly_summary (
	ctname varchar(50) REFERENCES care_takers(username) ON DELETE CASCADE,
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
	username varchar(200) REFERENCES full_timers(username) ON DELETE CASCADE,
	leave_date DATE,
	PRIMARY KEY (username, leave_date)
);