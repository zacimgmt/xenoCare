DROP TABLE IF EXISTS health;
DROP TABLE IF EXISTS services;

CREATE TABLE health(
    id SERIAL PRIMARY KEY, 
    name VARCHAR,
    type VARCHAR,
    address VARCHAR,
    email VARCHAR,
    phone BIGINT,
    url VARCHAR,
    description VARCHAR,
    schedule VARCHAR,
    insurance VARCHAR,
    english VARCHAR,
    queerFriendly varchar,
    urgent varchar,
    urgentTime varchar,
    specialty varchar,
    notes VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services(
    id SERIAL PRIMARY KEY, 
    name VARCHAR,
    type VARCHAR,
    address VARCHAR,
    email VARCHAR,
    phone BIGINT,
    url VARCHAR,
    description VARCHAR,
    schedule VARCHAR,
    english VARCHAR,
    queerFriendly varchar,
    urgent varchar,
    urgentTime varchar,
    price varchar,
    pricetable varchar,
    notes VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

