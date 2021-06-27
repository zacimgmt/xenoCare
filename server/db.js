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
    smallbio,
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
        smallbio,
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
    smallbio,
    description,
    schedule,
    insurance,
    english,
    queerFriendly,
    urgent,
    urgentTime,
    specialty, notes)
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16   ) `,
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
    smallbio,
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
        smallbio,
        description,
        schedule,
        english,
        queerFriendly,
        urgent,
        urgentTime,
        price,
        pricetable,
        notes,
    ];
    return db.query(
        `INSERT INTO services(name ,
    type ,
    address ,
    email ,
    phone ,
    url ,
    smallbio,
    description ,
    schedule ,
    english ,
    queerFriendly ,
    urgent ,
    urgentTime ,
    price ,
    pricetable ,
    notes) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) `,
        params
    );
};

exports.getAllHealth = () => {
    return db.query(`SELECT * FROM health`);
};

exports.getAllServices = () => {
    return db.query(`SELECT * FROM services`);
};

exports.getAllServicesNames = () => {
    return db.query(`SELECT name FROM services`);
};
exports.getAllHealthNames = () => {
    return db.query(`SELECT name FROM health`);
};

exports.getHealthById = (id) => {
    return db.query(`SELECT * FROM health WHERE id = $1`, [id]);
};
exports.getServiceById = (id) => {
    return db.query(`SELECT * FROM services WHERE id = $1`, [id]);
};

exports.addHealthPro = (array) => {
    return db.query(
        `INSERT INTO health(name,
        type,
        address,
        email,
        phone,
        url,
        smallbio,
        description,
        schedule,
        insurance,
        english,
        queerFriendly,
        urgent,
        urgentTime,
        specialty, notes)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) `,
        array
    );
};

exports.searchHealthFilter = (whereClause) => {
    return db.query(`SELECT * FROM health ${whereClause}`);
};

exports.searchServicesFilter = (whereClause) => {
    return db.query(`SELECT * FROM services ${whereClause}`);
};
