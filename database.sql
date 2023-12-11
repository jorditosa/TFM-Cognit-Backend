CREATE DATABASE cognit;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_status VARCHAR(255) NOT NULL,
    user_code_validation VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_points INT NOT NULL,
    skill_know_points INT NOT NULL,
    skill_sust_points INT NOT NULL,
    skill_prot_points INT NOT NULL,
    skill_expl_points INT NOT NULL
)

CREATE TABLE games(
    game_id SERIAL PRIMARY KEY,
    game_title VARCHAR(255) NOT NULL,
    game_category_id INT REFERENCES categories(category_id),
    game_description VARCHAR(255) NOT NULL,
    game_points_reward INT NOT NULL,
    game_skill_points_reward INT NOT NULL,
)

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
)

CREATE TABLE userSkills(
    user_skill_id SERIAL PRIMARY KEY,
    user_skill_name VARCHAR(255) NOT NULL,
)
