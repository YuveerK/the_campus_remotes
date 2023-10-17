const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const ownerRoute = require("./routes/ownerRoute");

const corsOptions = cors({
  origin: ["http://localhost:3000", "http://192.168.50.24:3000"],
});
app.use(corsOptions);
app.use(express.json());
app.use(ownerRoute);

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
