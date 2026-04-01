const express = require("express");
const router = express.Router();
const { attachUser, checkRole } = require("../middleware/authmiddleware");

router.use(attachUser);

// Create record
router.post("/", checkRole(["admin"]), async (req, res) => {
  const db = req.db;
  const { amount, type, category, date, notes } = req.body;

  if (!amount || !type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const record = {
    id: Date.now().toString(),
    amount,
    type,
    category,
    date,
    notes
  };

  db.data.records.push(record);
  await db.write();

  res.json(record);
});

// Get records (with filter)
router.get("/", async (req, res) => {
  let records = req.db.data.records;

  const { type, category } = req.query;

  if (type) {
    records = records.filter(r => r.type === type);
  }

  if (category) {
    records = records.filter(r => r.category === category);
  }

  res.json(records);
});

// Update record
router.put("/:id", checkRole(["admin"]), async (req, res) => {
  const db = req.db;
  const record = db.data.records.find(r => r.id === req.params.id);

  if (!record) return res.status(404).json({ message: "Not found" });

  Object.assign(record, req.body);
  await db.write();

  res.json(record);
});

// Delete record
router.delete("/:id", checkRole(["admin"]), async (req, res) => {
  const db = req.db;

  db.data.records = db.data.records.filter(r => r.id !== req.params.id);
  await db.write();

  res.json({ message: "Deleted" });
});

module.exports = router;