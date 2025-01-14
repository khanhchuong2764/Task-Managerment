const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const database = require("./config/database");
const app = express();
const port = process.env.Port;

database.connect();

// parse application/json
app.use(bodyParser.json());

const RouteClient = require("./routes/client/index.route");
RouteClient(app);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})