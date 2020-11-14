--- Accounts, covering constraint on pcs_admins and users

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

CREATE FUNCTION check_not_user() 
RETURNS TRIGGER LANGUAGE PLPGSQL AS $$
	DECLARE ctx NUMERIC;

	BEGIN
		SELECT COUNT(*) INTO ctx
		FROM users U
		WHERE NEW.username = U.username;
		IF ctx > 0 THEN RAISE EXCEPTION 'pcs_admin is also a user';
		ELSE RETURN NEW;
		END IF;
	END;
$$;

CREATE FUNCTION check_not_pcs_admin()
RETURNS TRIGGER LANGUAGE PLPGSQL AS $$
	DECLARE ctx NUMERIC;

	BEGIN
		SELECT COUNT(*) INTO ctx
		FROM pcs_admins P
		WHERE NEW.username = P.username;
		IF ctx > 0 THEN RAISE EXCEPTION 'user is also a pcs_admin';
		ELSE RETURN NEW;
		END IF;
	END;
$$;

CREATE TRIGGER check_pcs_admin
BEFORE INSERT OR UPDATE ON pcs_admins
FOR EACH ROW EXECUTE PROCEDURE check_not_user();

CREATE TRIGGER check_user
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE check_not_pcs_admin();

CREATE VIEW accounts AS
	SELECT username, password FROM pcs_admins
	UNION
	SELECT username, password FROM users;

--- Users, covering and overlappin constraints

CREATE TABLE IF NOT EXISTS pet_owners (
	username VARCHAR(200) PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS care_takers (
	username VARCHAR(200) PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS full_timers (
	username VARCHAR(200) PRIMARY KEY REFERENCES care_takers(username) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS part_timers(
	username VARCHAR(200) PRIMARY KEY REFERENCES care_takers(username) ON DELETE CASCADE
);

CREATE FUNCTION check_not_full_timer()
RETURNS TRIGGER LANGUAGE PLPGSQL AS $$
	DECLARE ctx NUMERIC;
	BEGIN
		SELECT COUNT(*) INTO ctx
		FROM full_timers F
		WHERE NEW.username = F.username;
		IF ctx > 0 THEN RAISE EXCEPTION 'part timer is also a full timer';
		ELSE RETURN NEW;
		END IF;
	END;
$$;

CREATE TRIGGER check_part_timer
BEFORE INSERT OR UPDATE ON part_timers
FOR EACH ROW EXECUTE PROCEDURE check_not_full_timer();

CREATE FUNCTION check_not_part_timer()
RETURNS TRIGGER LANGUAGE PLPGSQL AS $$
	DECLARE ctx NUMERIC;
	BEGIN
		SELECT COUNT(*) INTO ctx
		FROM part_timers P
		WHERE NEW.username = P.username;
		IF ctx > 0 THEN RAISE EXCEPTION 'full timer is also a part timer';
		ELSE RETURN NEW;
		END IF;
	END;
$$;

CREATE TRIGGER check_part_timer 
BEFORE INSERT OR UPDATE ON part_timers 
FOR EACH ROW EXECUTE PROCEDURE check_not_full_timer();

CREATE TRIGGER check_full_timer
BEFORE INSERT OR UPDATE ON full_timers
FOR EACH ROW EXECUTE PROCEDURE check_not_part_timer();

--- Base Prices

CREATE TABLE IF NOT EXISTS base_prices (
	category VARCHAR(200) PRIMARY KEY,
	price INT NOT NULL
);

--- Pets

CREATE TABLE IF NOT EXISTS pets (
	poname VARCHAR(200) REFERENCES pet_owners(username) ON DELETE CASCADE,
	pname VARCHAR(200),
	profile VARCHAR(200),
	category varchar(200) REFERENCES base_prices(category) NOT NULL,
	special_requirements VARCHAR(200),
	PRIMARY KEY (poname, pname)
);

--- Availabilities

CREATE TABLE IF NOT EXISTS availabilities (
	username VARCHAR(200) REFERENCES care_takers(username) ON DELETE CASCADE,
	start_date DATE,
	end_date DATE CHECK (start_date <= end_date),
	category VARCHAR(200) REFERENCES base_prices(category),
	PRIMARY KEY(username, start_date, end_date, category)
);

--- Bids

CREATE TABLE IF NOT EXISTS bids (
	start_date DATE,
	end_date DATE,
	category VARCHAR(200) REFERENCES base_prices(category),
	poname VARCHAR(200),
	pname VARCHAR(200),
	ctuname VARCHAR(200),
	bid_date DATE NOT NULL,
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
		(start_date <= bid_date)
		AND (bid_date <= end_date)
	)
);

CREATE FUNCTION check_caretaker_pet_limit() RETURNS TRIGGER LANGUAGE PLPGSQL AS $$
DECLARE ctx NUMERIC;
BEGIN
SELECT COUNT(*) INTO ctx
FROM bids B
WHERE NEW.ctuname = B.ctuname
	AND NEW.bid_date = B.bid_date
	AND B.is_successful = TRUE;
IF ctx = 5 THEN RAISE EXCEPTION 'caretaker can only take care of up to 5 pets in a day';
ELSE RETURN NEW;
END IF;
END;
$$;
CREATE TRIGGER check_bid BEFORE
INSERT
OR
UPDATE ON bids FOR EACH ROW EXECUTE PROCEDURE check_caretaker_pet_limit();

--- Monthly Summary

CREATE TABLE IF NOT EXISTS monthly_summary (
	ctname varchar(200) REFERENCES care_takers(username) ON DELETE CASCADE,
	year INT CHECK(year >= 0),
	month INT CHECK(
		month >= 1
		AND month <= 12
	),
	pet_days INT CHECK(pet_days >= 0),
	salary INT CHECK(salary >= 0),
	PRIMARY KEY(ctname, year, month)
);

CREATE FUNCTION add_successful_bid_to_monthly_summary()
RETURNS TRIGGER LANGUAGE PLPGSQL AS $$
	DECLARE salaryToAdd INT;
	BEGIN
		SELECT price INTO salaryToAdd FROM base_prices WHERE category = NEW.category;
		IF EXISTS (SELECT * from monthly_summary 
								WHERE ctname = NEW.ctuname 
								AND year = EXTRACT(YEAR FROM NEW.bid_date)
								AND month = EXTRACT(MONTH FROM NEW.bid_date) + 1
							)
		THEN UPDATE monthly_summary
			SET pet_days = pet_days + 1, salary = salary + salaryToAdd
			WHERE ctname = NEW.ctuname AND year = EXTRACT(YEAR FROM NEW.bid_date) AND month = EXTRACT(MONTH FROM NEW.bid_date) + 1;
		ELSE INSERT INTO monthly_summary
			VALUES (NEW.ctuname, EXTRACT(YEAR FROM NEW.bid_date), EXTRACT(MONTH FROM NEW.bid_date) + 1, 1, salaryToAdd);
		END IF;
		RETURN NULL;
	END;
$$;

CREATE TRIGGER add_successful_bid_to_monthly_summary
AFTER UPDATE ON bids
FOR EACH ROW
WHEN (NEW.is_successful IS TRUE)
EXECUTE PROCEDURE add_successful_bid_to_monthly_summary();

--- Leaves

CREATE TABLE IF NOT EXISTS leaves (
	username varchar(200) REFERENCES full_timers(username) ON DELETE CASCADE,
	leave_date DATE,
	PRIMARY KEY (username, leave_date)
);
