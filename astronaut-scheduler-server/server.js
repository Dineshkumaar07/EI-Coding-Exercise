const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors")
const app = express();

connectDB();
app.use(cors())

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
