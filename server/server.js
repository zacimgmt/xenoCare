const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const basicAuth = require("basic-auth");
const db = require("./db");

app.use(compression());
app.use(express.json());

// app.use(csurf());

const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!creds || creds.name != "1" || creds.pass != "1") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/test", auth, (req, res) => {
    res.json(true);
});

app.post("/healthTool", async (req, res) => {
    console.log("req.body: ", req.body);
    if (req.body.inputHealth) {
        const {
            name = "",
            type = "",
            address = "",
            email = "",
            phone = "",
            url = "",
            smallbio = "",
            description = "",
            schedule = "",
            insurance = "",
            english = "",
            queerFriendly = "",
            urgent = "",
            urgentTime = "",
            specialty = "",
            notes = "",
        } = req.body.inputHealth;

        const result = await db.addHealth(
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
        );
        console.log("result: ", result);
        res.json(true);
    } else if (req.body.inputServices) {
        console.log("req.body: ", req.body);
        const {
            name = "",
            type = "",
            address = "",
            email = "",
            phone,
            url = "",
            smallbio = "",
            description = "",
            schedule = "",
            english = "",
            queerFriendly = "",
            urgent = "",
            urgentTime = "",
            price = "",
            pricetable = "",
            notes = "",
        } = req.body.inputServices;

        const result = await db.addServices(
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
        );
        console.log("result: ", result);
        res.json(true);
    }

    {
        // console.log('name: ', name)
        // console.log('email: ', email)
        // console.log('type: ', type)
        // console.log('address: ', address)
        // console.log('phone: ', phone)
        // console.log('url: ', url)
        // console.log('description ',description)
        // console.log('insurance: ', insurance)
        // console.log('english: ', english)
        // console.log('queerFriendly: ', queerFriendly)
        // console.log('urgent: ', urgent)
        // console.log('specialty: ', specialty)}
    }
});

app.get("/protest", (req, res) => {
    db.addHealthPro([
        "Praxis City Ost",
        "Healthcare",
        "Gubener Str. 37, 10243 Berlin, Germany",
        "info@praxiscityost.de",
        493029363950,
        "http://www.praxiscityost.de/",
        "",
        "",
        "http://www.praxiscityost.de/sprechstunden.php\n",
        "",
        "TRUE",
        "TRUE",
        "TRUE",
        "",
        "Infectology",
        "I was able to get PrEP prescribed - no issues",
    ]);
});

app.get("/allnames.json", async (req, res) => {
    const { rows: services } = await db.getAllServicesNames();
    const { rows: health } = await db.getAllHealthNames();
    const rawNames = [...services, ...health];
    const allNames = rawNames.map(({ name }) => name);
    console.log("allNames: ", allNames);
    res.json(allNames);
});

app.get("/services.json", async (req, res) => {
    let { rows } = await db.getAllHealth();
    let { rows: servicesRows } = await db.getAllServices();
    const allResults = [...rows, ...servicesRows];
    console.log("allResults: ", allResults);
    res.json({ allResults });
});

app.post("/searchServices", async (req, res) => {
    console.log("req.body: ", req.body);
    const { inputValue, quality, languages } = req.body;

    if (!inputValue && !quality.length && !languages.length) {
        let { rows } = await db.getAllHealth();
        let { rows: servicesRows } = await db.getAllServices();
        const allResults = [...rows, ...servicesRows];
        console.log("allResults: ", allResults);
        return res.json(allResults);
    }

    let inputQuery = "";
    if (inputValue) {
        inputQuery = `name ILIKE '%${inputValue}%'
        OR description ILIKE '%${inputValue}%'
        `;
    }

    const langQuery = languages.reduce((accumulator, tag, index) => {
        let updatedAcum = accumulator + ` ${tag} = TRUE`;
        if (index < languages.length - 1) {
            updatedAcum += "\n AND ";
        }

        return updatedAcum;
    }, "");
    console.log("langQuery: ", langQuery);
    const qualityQuery = quality.reduce((accumulator, tag, index) => {
        let updatedAcum = accumulator + ` ${tag} ILIKE 'TRUE'`;
        if (index < quality.length - 1) {
            updatedAcum += "\n AND ";
        }

        return updatedAcum;
    }, "");
    console.log("qualityQuery: ", qualityQuery);

    let whereClause;
    if ((inputValue && quality.length) || languages.length) {
        whereClause = `WHERE${qualityQuery} AND ${inputQuery};`;
    } else {
        whereClause = `WHERE${qualityQuery} ${inputQuery};`;
    }

    console.log("whereClause: ", whereClause);

    // try{

    const { rows: health } = await db.searchHealthFilter(whereClause);
    const { rows: services } = await db.searchServicesFilter(whereClause);
    // }
    // catch  (err) {
    //     console.log('err: ', err)

    // }
    const allResults = [...health, ...services];
    console.log("allResults: ", allResults);
    res.json(allResults);
});

app.get("/servProfile/:type/:id", async (req, res) => {
    const { type, id } = req.params;
    if (type === "h") {
        console.log("type: ", type);
        let { rows } = await db.getHealthById(id);
        console.log("rows getHealthById: ", rows);
        return res.json(rows);
    } else {
        let { rows } = await db.getHealthById(id);
        console.log("rows getHealthById: ", rows);
        return res.json(rows);
        console.log("type in server: ", type);
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
