CREATE DATABASE werk;

\c werk;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS applications;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  company VARCHAR(120) NOT NULL,
  position VARCHAR(120) NOT NULL,
  url VARCHAR(120),
  subtitle VARCHAR(120),
  status VARCHAR(120) NOT NULL,
  notes VARCHAR(1000),
  cover_letter BOOLEAN NOT NULL,
  resume_number VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password)
VALUES ('nathaniel', 'me@nathaniel.gg', 'asd');