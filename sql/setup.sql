DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS players;

CREATE TABLE teams (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL 
);

CREATE TABLE players (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    number INT NOT NULL,
    team_id INT NOT NULL REFERENCES teams(id)
);

INSERT INTO teams (name, location)
VALUES ('Portland Trail Blazers', 'Portland, Oregon');

INSERT INTO teams (name, location)
VALUES ('Denver Nuggets', 'Denver, Colorado');