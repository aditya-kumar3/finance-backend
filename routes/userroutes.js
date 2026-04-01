const express = require("express");
const router = express.Router();
const { attachUser, checkRole } = require("../middleware/authmiddleware");

router.use(attachUser);

// Create user (admin only)
router.post("/", checkRole(["admin"]), async (req, res) => {
  const db = req.db;
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    role,
    status: "active"
  };

  db.data.users.push(newUser);
  await db.write();

  res.json(newUser);
});

// Get all users
router.get("/", async (req, res) => {
  res.json(req.db.data.users);
});

// Update user
router.patch("/:id", checkRole(["admin"]), async (req, res) => {
  const db = req.db;
  const user = db.data.users.find(u => u.id === req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  Object.assign(user, req.body);
  await db.write();

  res.json(user);
});

module.exports = router;