CREATE TABLE IF NOT EXISTS users (
	username  varchar(200) PRIMARY KEY NOT NULL,
	password varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS bids (
	start_date date,
	end_date date,
	category varchar(200),
	pname varchar(200) REFERENCES pet(pname) ON DELETE CASCADE,
	bid_start_date date NOT NULL,
	bid_end_date date NOT NULL,
	review varchar,
	rating decimal(2,1),
	successful boolean NOT NULL
	FOREIGN KEY (start_date, end_date, category) REFERENCES 
		availability(start_date, end_date, category) ON DELETE CASCADE,
	PRIMARY KEY (start_date, end_date, category, pname)
);

CREATE TABLE IF NOT EXISTS base_prices (
	category varchar(200) PRIMARY KEY,
	price decimal(5,2) NOT NULL
);
