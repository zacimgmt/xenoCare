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

app.get("/services.json", async (req, res) => {
    let { rows } = await db.getAllHealth();
    let { rows: servicesRows } = await db.getAllServices();
    const allResults = [...rows, ...servicesRows];
    console.log("allResults: ", allResults);
    res.json({allResults});
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
