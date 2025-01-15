const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const database = require("./config/database");
const cors = require('cors');
const app = express();
const port = process.env.Port;

database.connect();

// Tất cả tên miền được phép truy cập vào
app.use(cors());
// Cho phép 1 tên miền cụ thể được phép truy cập
// const corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200
// }
// cors(corsOptions);


// parse application/json
app.use(bodyParser.json());

const RouteClient = require("./routes/client/index.route");
RouteClient(app);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})