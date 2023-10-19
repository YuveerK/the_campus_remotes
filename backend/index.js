const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const ownerRoute = require("./routes/ownerRoute");
const documentsRoute = require("./routes/documentsRoute");
const propertiesRoute = require("./routes/propertiesRoute");
const complexRoute = require("./routes/complexRoute");

const corsOptions = cors({
  origin: ["http://localhost:3000", "http://192.168.50.24:3000"],
});

app.use(corsOptions);
app.use(express.json());
app.use(ownerRoute);
app.use(documentsRoute);
app.use(propertiesRoute);
app.use(complexRoute);
app.use("/uploads", express.static("uploads")); // Add this line to serve static files from the 'uploads' directory

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
