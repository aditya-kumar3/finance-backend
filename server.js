const express = require("express");
const cors = require("cors");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const userRoutes = require("./routes/userroutes");
const recordRoutes = require("./routes/recordroutes");
const dashboardRoutes = require("./routes/dashboardroutes");

const app = express();
app.use(cors());
app.use(express.json());

// DB setup
const adapter = new JSONFile("db.json");
const db = new Low(adapter, {
  users: [],
  records: []
});

async function startServer() {
  await db.read();
  db.data ||= { users: [], records: [] };

  // attach db to req
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use("/users", userRoutes);
  app.use("/records", recordRoutes);
  app.use("/dashboard", dashboardRoutes);

  app.get("/", (req, res) => {
    res.send("Finance API running...");
  });

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}

startServer();