# CS2102_2021_S1_08

## Introduction

This is a project for the module CS2102 conducted at NUS for Semester 1 of AY2020/21.

The project consists of developing a pet caring service application that allows pet owner to search for care takers for their pets for certain periods of time.

Preliminary Constraints and ER Diagram are in /docs folder

How to run the server:
1. clone the repo and all that stuff, change directory to /server
2. run `npm install`
3. launch postgres if you have not done so using `pg_ctl -D "<path to postgreSQL\version\data>" start` example: `pg_ctl -D "E:\Program Files\PostgreSQL\13\data" start`
4. create required schema by using the command `-U <DB_USER> -d <DB_DATABASE> -f <path to database.sql (in server folder of this repo)>` example: `-U person -d postgres -f E:\Users\me\Desktop\CS2102_2021_S1_08\server\database.sql`
5. edit the .env file to your database specifics
6. run `npm start dev`
7. the server will be running on localhost port 8080
