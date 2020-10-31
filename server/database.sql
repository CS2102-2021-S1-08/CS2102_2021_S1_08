CREATE TABLE IF NOT EXISTS users (
	username  varchar(200) PRIMARY KEY NOT NULL,
	password varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS MonthlySummary (
  ctname varchar(50) REFERENCES CareTaker (name) ON DELETE cascade,
  year INT,
  month INT,
  petDays INT,
  salary INT,
  PRIMARY KEY(ctname, year, month)
)