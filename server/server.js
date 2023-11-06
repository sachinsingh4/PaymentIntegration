const express = require("express");
const cors = require("cors");

const payment = require("./routes/payment.route");
const app = express();
require("./config/config.env");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//This is helper function

app.use("/api", payment);
//Listening Port...
app.listen(PORT, () => {
  console.log("Server is running");
});
