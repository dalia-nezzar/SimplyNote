CREATE DATABASE notes;

-- Path: data/sql.sql

CREATE TABLE todo(
    id SERIAL PRIMARY KEY NOT NULL,
    task text UNIQUE,
    status INTEGER DEFAULT 0
);