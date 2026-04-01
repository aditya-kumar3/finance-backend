const express = require("express");
const router = express.Router();
const { attachUser } = require("../middleware/authmiddleware");

router.use(attachUser);

// Summary
router.get("/summary", (req, res) => {
  const records = req.db.data.records;

  let income = 0;
  let expense = 0;

  records.forEach(r => {
    if (r.type === "income") income += r.amount;
    else expense += r.amount;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense
  });
});

// Category wise
router.get("/category", (req, res) => {
  const records = req.db.data.records;

  const result = {};

  records.forEach(r => {
    if (!result[r.category]) result[r.category] = 0;
    result[r.category] += r.amount;
  });

  res.json(result);
});

// Recent (last 5)
router.get("/recent", (req, res) => {
  const records = req.db.data.records;

  const recent = [...records]
    .reverse()
    .slice(0, 5);

  res.json(recent);
});

module.exports = router;