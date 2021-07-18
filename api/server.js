const express = require("express");
const cors = require("cors");

const app = express();

var whitelist = ['0.0.0.0','http://0.0.0.0:3000', 'http://0.0.0.0:3001', 'http://0.0.0.0:5433']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));   /* bodyParser.urlencoded() is deprecated */

const db = require("./models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({message: "API projet MERN ESGI Groupe 1 : Lima Milan, Edouard Gachet, Jacquenet Jean Christophe, Thomas Lemoine."});
});

require("./routes/user")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
