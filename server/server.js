const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const basicAuth = require("basic-auth");
const db = require("./db");

app.use(compression());
app.use(express.json());


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

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.get("/test", auth, (req, res) => {
    res.json(true);
});

app.post("/healthTool", async (req, res) => {
    if (req.body.inputHealth) {
        const {
            name = "",
            type = "",
            address = "",
            lat = 0,
            long = 0,
            email = "",
            phone = "",
            url = "",
            smallbio = "",
            description = "",
            schedule = "",
            price = "",
            english = "",
            languages,
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
            lat,
            long,
            email,
            phone,
            url,
            smallbio,
            description,
            schedule,
            price,
            english,
            languages,
            queerFriendly,
            urgent,
            urgentTime,
            specialty,
            notes
        );
        console.log("result: ", result);
        res.json(true);
    } else if (req.body.inputServices) {
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

});

app.get("/prohealth", async (req, res) => {
    const data = [
        [
            "Praxis City Ost",
            "Healthcare",
            "Gubener Str. 37, 10243 Berlin, Germany",
            52.5101335,
            13.4501451,
            "info@praxiscityost.de",
            493029363950,
            "http://www.praxiscityost.de/",
            "",
            "",
            "http://www.praxiscityost.de/sprechstunden.php\n",
            "",
            "TRUE",
            "German, Portuguese",
            "TRUE",
            "TRUE",
            "",
            "Infectology",
            "I was able to get PrEP prescribed - no issues",
        ],
        [
            "VISTA",
            "Healthcare",
            "Donaustraße 83, 12043, Berlin\n",
            52.4789207,
            13.4417765,
            "",
            4930400370100,
            "https://vistaberlin.de/",
            "",
            " Drug counselling For whom? Are you in need of information on topics like the Berlin drug help system, addiction, alcohol, prescription or illegal drugs? Are you even looking for tangible answers? We will answer your questions – proficient and confidential. What do we offer? Staff members of vista are highly experienced in the counselling of people with problems concerning alcohol, prescription and illegal drugs. We even offer counselling for concerned relatives, partners and friends. We always take cultural background into consideration. Our counselling is free of charge. We are bound to professional discretion. And if there’s need for anonymous counselling - we can also do that.",
            "",
            "not",
            "TRUE",
            "German, Polish",
            "",
            "",
            "",
            "Drug",
            "",
        ],
        [
            "Drogennotdienst",
            "Healthcare",
            "Genthiner Straße 48, 10785 Berlin\n",
            52.5017857,
            13.3581711,
            "info@notdienstberlin.de",
            4930233240200,
            "https://drogennotdienst.de/",
            "",
            "The emergency service for those at risk of addiction and those already addicted to drugs and alcohol in Berlin (Notdienst Berlin e. V.) was founded in 1984 and offers help to people with addiction. We also welcome people who are not addicted and who want to reflect on or change their consumption behaviour. In addition, we provide information on the effects and risks of substance consumption. https://drogennotdienst.de/wp-content/uploads/2018/12/Notdienst_Flyer_englisch.pdf",
            "Opening hours: Monday to Friday: 8.30 a.m. to 9.00 p.m. Weekends/public holidays: 2 p.m. to 9.00 p.m.",
            "",
            "TRUE",
            "German, French",
            "",
            "TRUE",
            "Hotline: 030 19237 – day or night",
            "Drug",
            "",
        ],
        [
            "Berliner Kirsendiesnt",
            "Healthcare",
            "Brandenburgische Straße 80, 10713 Berlin",
            52.4874991,
            13.3183703,
            "l.fricke@berliner-krisendienst.de\n",
            493086001159,
            "https://www.berliner-krisendienst.de/en/,",
            "",
            "The Berlin Crisis Service provides fast and professional assistance for issues including psychosocial crises and acute mental and psychiatric emergencies. Our advice is free of charge and available 365 days a year around the clock. People in need of assistance can be helped personally, by phone, and in extreme situations on site at nine Berlin locations without an appointment. The consultation can also be carried out anonymously upon request.",
            "Regional accessibility from 16:00 until 24:00: Our nine locations are available to you daily from 16:00 to 24:00. You can reach us for advice by telephone or personally without an appointment. If there is an emergency, we can also come to you, with a doctor if necessary. Citywide emergency service in Berlin-Mitte: You can reach the national emergency service at night from 24:00 to 08:00 and on weekends and holidays from 08:00 to1 6:00. On weekdays from 08:00 to 16:00, you can receive only telephone information, short clarifications or a referral",
            "not",
            "TRUE",
            "German",
            "",
            "TRUE",
            "24H",
            "Psychiatrisy",
            "",
        ],
        [
            "Dr. Gal Goldstein",
            "",
            "Maaßenstraße 14, 10777 Berlin",
            52.497213,
            13.354217,
            "",
            490302162006,
            "https://www.doctor-goldstein.com/",
            "Our practice at Winterfeldtplatz has been open since April 1, 2020. In addition to comprehensive primary care, we offer testing and treatment for all sexually transmitted infections (STI). Furthermore, travel medicine consultations as well as vaccinations are available.",
            "Our practice at Winterfeldtplatz has been open since April 1, 2020. In addition to comprehensive primary care, we offer testing and treatment for all sexually transmitted infections (STI). Furthermore, travel medicine consultations as well as vaccinations are available. Our international team attaches great importance to a good practice atmosphere and is happy to take time for the needs of patients. Our multilingualism makes it possible to perform treatments in German, English, Hebrew, Hungarian, Arabic, Turkish, Russian, Bulgarian and French. PHILOSOPHY Building trust and talking openly with each other - these are the two pillars of my work with patients. For me, successful treatment always includes a good interpersonal relationship. Especially when it comes to very personal issues like sexual health, you have to be able to be honest. My job is to heal and help. Not to judge and condemn. Our team of qualified and motivated staff* also contributes to a non-judgmental and comfortable atmosphere. From simple consultation to treatment and prevention, responsiveness and trust are the most important things for us.",
            "https://www.doctor-goldstein.com/home,\n",
            "",
            "TRUE",
            "German, English, Hebrew, Hungarian, Arabic, Turkish, Russian, Bulgarian, French.",
            "TRUE",
            "TRUE",
            "",
            "Infectology",
            "",
        ],
        [
            "Praxis Sabine Omankowsky",
            "",
            "Alt-Moabit 58, 10555 Berlin",
            52.5243814,
            13.3279296,
            "praxis@doktor-omankowsky.de",
            490303917603,
            "http://www.doktor-omankowsky.de/",
            "",
            "",
            "",
            "",
            "TRUE",
            "German, Spanish",
            "TRUE",
            "FALSE",
            "",
            "GP",
            "They have a more generalized demographic however they non- discriminatory. The reception isn’t the friendliest, but the doctors are helpful and time-efficient. Typically a lot of younger people are in the facility because they are interning from Charite. They are also very helpful for non-German speakers. If you need medication they are able to issue prescriptions easily, or provide referrals for more specialized institutions.",
        ],
    ];
    data.map(async (each) => {
        db.addHealthPro(each).catch((err) => {
            console.log("err: ", err);
            res.json(err);
        });
      
    });
});

app.get("/proservices", async (req, res) => {
    const data = [
        [
            "AWO Frauenberatung\n",
            "Jobcenter",
            "Sonnenallee 200, 12059 Berlin",
            52.47501,
            13.45311,
            "merle-amelung@awo-suedost.de",
            49306139630,
            '',
            "The AWO Südost website offers a wide range of information that is regularly updated. Liability for topicality, completeness or quality is excluded. All free and other offers are non-binding. The editors reserve the right to change, add to, or delete the offers or to cease publication.",
            '',
            '',
            "TRUE",
            '',
            '',
            "TRUE",
            '',
            "TRUE",
            '',
            "Merle is the best- super lovely patient and helpful with these complicated Jobcenter applications",
        ],
    ];
    data.map(async (each) => {
        db.addServicesPro(each).catch((err) => {
            console.log("err: ", err);
            res.json(err);
        });
     
    });
});

app.get("/allnames.json", async (req, res) => {
    const { rows: services } = await db.getAllServicesNames();
    const { rows: health } = await db.getAllHealthNames();
    const rawNames = [...services, ...health];
   
    const allNames = rawNames.map(({ name }) => name);

    res.json(allNames);
});

app.get("/services.json", async (req, res) => {
    let { rows } = await db.getAllHealth();
    let { rows: servicesRows } = await db.getAllServices();
    const allResults = [...rows, ...servicesRows];
    res.json({ allResults });
});

app.post("/searchServices", async (req, res) => {
    const { inputValue, quality, languages, searchMode } = req.body;

    if (!inputValue && !quality.length && !languages.length) {
        let { rows } = await db.getAllHealth();
        let { rows: servicesRows } = await db.getAllServices();
        const allResults = [...rows, ...servicesRows];
        return res.json(allResults);
    }

    let count = 0;
    let params = [];
    let inputQuery = "";
    if (inputValue) {
        inputQuery = `( name ILIKE $${++count}
        OR description ILIKE $${count})
        `;
        params.push(`%${inputValue}%`);
    }

    const langQuery = languages.reduce((accumulator, tag, index) => {
        let updatedAcum = accumulator + ` languages ILIKE $${++count}`;
        params.push(`%${tag}%`);
        if (index < languages.length - 1) {
            updatedAcum += "\n OR ";
        } else {
            updatedAcum += ")";
        }

        return updatedAcum;
    }, "(");
    const qualityQuery = quality.reduce((accumulator, tag, index) => {
        let updatedAcum = accumulator + ` ${tag} ILIKE 'TRUE'`;
        // params.push(tag);
        if (index < quality.length - 1) {
            updatedAcum += `\n ${searchMode}`;
        } else {
            updatedAcum += "\n )";
        }

        return updatedAcum;
    }, "(");

    let whereClause;
    if (inputValue) {
        if (quality.length && languages.length) {
            whereClause = `WHERE ${inputQuery} AND ${qualityQuery} AND ${langQuery};`;
          
        } else if (quality.length) {
            whereClause = `WHERE ${inputQuery} AND ${qualityQuery};`;
          
        } else if (languages.length) {
            whereClause = `WHERE ${inputQuery} AND ${langQuery};`;
          
        } else {
            whereClause = `WHERE ${inputQuery}`;
        }
    } else {
        if (quality.length && languages.length) {
            whereClause = `WHERE ${qualityQuery} AND ${langQuery};`;
          
        } else if (quality.length) {
            whereClause = `WHERE ${qualityQuery};`;
          
        } else if (languages.length) {
            whereClause = `WHERE ${langQuery};`;
          
        }
    }

    

    

    const { rows: health } = await db.searchHealthFilter(whereClause, params);
    const { rows: services } = await db.searchServicesFilter(
        whereClause,
        params
    );
 
    const allResults = [...health, ...services];
  
    res.json(allResults);
});

app.get("/servProfile/:type/:id", async (req, res) => {
    const { type, id } = req.params;
    if (type === "h") {
        
        let { rows } = await db.getHealthById(id);
      
        return res.json(rows);
    } else {
     
        let { rows } = await db.getServiceById(id);
     
        return res.json(rows);
    }
});


app.get("/lang", async (req, res) => {
    const { rows } = await db.testing();
    res.json(rows);
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
