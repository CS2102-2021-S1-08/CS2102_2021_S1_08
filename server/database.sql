CREATE TABLE IF NOT EXISTS users (
	username  varchar(200) PRIMARY KEY NOT NULL,
	password varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS bids (
	start_date date,
	end_date date,
	category varchar(50),
	pname varchar(50) REFERENCES pets(pname) ON DELETE CASCADE,
	bid_start_date date NOT NULL,
	bid_end_date date NOT NULL,
	review varchar,
	rating int CHECK((rating IS NULL) OR (rating >= 0 AND rating <= 5)),
	successful boolean NOT NULL
	FOREIGN KEY (start_date, end_date, category) REFERENCES 
		availability(start_date, end_date, category) ON DELETE CASCADE,
	PRIMARY KEY (start_date, end_date, category, pname)
);

CREATE TABLE IF NOT EXISTS base_prices (
	category varchar(50) PRIMARY KEY,
	price int NOT NULL
);

CREATE TABLE IF NOT EXISTS onthlySummary (
  ctname varchar(50) REFERENCES CareTaker (name) ON DELETE cascade,
  year INT,
  month INT,
  petDays INT,
  salary INT,
  PRIMARY KEY(ctname, year, month)
)
