const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const Role = db.role;
const mustacheExpress = require('mustache-express');

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));   /* bodyParser.urlencoded() is deprecated */

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

function initial() {
    Role.create({
        id: 1,
        name: "merchant"
    });

    Role.create({
        id: 2,
        name: "admin"
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({message: "API projet MERN ESGI Groupe 1 : Lima Milan, Edouard Gachet, Jacquenet Jean Christophe, Thomas Lemoine."});
});

app.get("/payment/:id", (req, res) => {
    app.engine('mustache', mustacheExpress());

    app.set('view engine', 'mustache');
    app.set('views', __dirname + '/views');

    res.render('payment');
});


require("./routes/user")(app);
require("./routes/auth")(app);
require("./routes/credentials")(app);
require("./routes/transaction")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
