const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/messages", messagesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
