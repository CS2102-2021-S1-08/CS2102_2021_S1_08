# CS2102_2021_S1_08

## Introduction

This is a project for the module CS2102 conducted at NUS for Semester 1 of AY2020/21.

The project consists of developing a pet caring service application that allows pet owner to search for care takers for their pets for certain periods of time.

Final project report and constraints are [in the docs/ folder.](./docs)

## Prerequisites

- Node 12.18.0
- Postgres 11/12/13

## Setup

1. Clone this repository
2. Run `npm install`
3. Create a postgres database to be used for the application 
3. Edit the `.env` file for database connection specifics
4. create required schema by using the command `-U <DB_USER> -d <DB_DATABASE> -f <path to database.sql (in server folder of this repo)>` example: `-U person -d postgres -f E:\Users\me\Desktop\CS2102_2021_S1_08\server\database.sql`
5. run `npm start dev`
6. the server will be running on localhost port 8080
