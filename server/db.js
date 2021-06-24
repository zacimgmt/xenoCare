var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres:@localhost:5432/xenocare"
);

exports.addHealth = (
    name,
    type,
    address,
    email,
    phone,
    url,
    description,
    schedule,
    insurance,
    english,
    queerFriendly,
    urgent,
    urgentTime,
    specialty,
    notes
) => {
    const params = [
        name,
        type,
        address,
        email,
        phone,
        url,
        description,
        schedule,
        insurance,
        english,
        queerFriendly,
        urgent,
        urgentTime,
        specialty,
        notes,
    ];
    return db.query(
        `INSERT INTO health(name,
    type,
    address,
    email,
    phone,
    url,
    description,
    schedule,
    insurance,
    english,
    queerFriendly,
    urgent,
    urgentTime,
    specialty, notes)
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) `,
        params
    );
};

exports.get = () => {
    return db.query(`SELECT * FROM health`);
};

exports.addServices = (
    name,
    type,
    address,
    email,
    phone,
    url,
    description,
    schedule,
    english,
    queerFriendly,
    urgent,
    urgentTime,
    price,
    pricetable,
    notes
) => {
    const params = [
        name,
        type,
        address,
        email,
        phone,
        url,
        description,
        schedule,
        english,
        queerFriendly,
        urgent,
        urgentTime,
        price,
        pricetable,
        notes
    ];
    return db.query(
        `INSERT INTO services(name ,
    type ,
    address ,
    email ,
    phone ,
    url ,
    description ,
    schedule ,
    english ,
    queerFriendly ,
    urgent ,
    urgentTime ,
    price ,
    pricetable ,
    notes) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) `, params
    );
};
