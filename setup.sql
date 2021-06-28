DROP TABLE IF EXISTS health;
DROP TABLE IF EXISTS services;

CREATE TABLE health(
    id SERIAL PRIMARY KEY, 
    name VARCHAR,
    type VARCHAR,
    address VARCHAR,
    lat Decimal(8,6),
    long Decimal(9,6),
    email VARCHAR,
    phone BIGINT,
    url VARCHAR,
    smallbio VARCHAR,
    description VARCHAR,
    schedule VARCHAR,
    price VARCHAR,
    english VARCHAR,
    languages VARCHAR,
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
     lat DECIMAL(15, 15),
    long DECIMAL(15, 15),
    email VARCHAR,
    phone BIGINT,
    url VARCHAR,
    smallbio VARCHAR,
    description VARCHAR,
    schedule VARCHAR,
    english VARCHAR,
    languages VARCHAR,
    queerFriendly varchar,
    urgent varchar,
    urgentTime varchar,
    price varchar,
    pricetable varchar,
    notes VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

