const db = require("../database/db.config");
const express = require("express");
const router = express.Router();

// Create a new complex
router.post("/complex", (req, res) => {
  const { complex_name, address } = req.body;
  const created_at = new Date();
  const updated_at = created_at;

  const query =
    "INSERT INTO complex (complex_name, address, created_at, updated_at) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [complex_name, address, created_at, updated_at],
    (error, results) => {
      if (error)
        return res
          .status(500)
          .send({ success: false, message: "An error occurred" });
      res.status(201).send({ success: true, data: results });
    }
  );
});

// Get all complex
router.get("/complex", (req, res) => {
  const query = "SELECT * FROM complex";
  db.query(query, (error, results) => {
    if (error)
      return res
        .status(500)
        .send({ success: false, message: "An error occurred" });
    res.send(results);
  });
});

// Get a complex by its ID
router.get("/complex/:complex_id", (req, res) => {
  const { complex_id } = req.params;

  const query = "SELECT * FROM complex WHERE complex_id = ?";
  db.query(query, [complex_id], (error, results) => {
    if (error)
      return res
        .status(500)
        .send({ success: false, message: "An error occurred" });
    res.send({ success: true, data: results });
  });
});

// Update a complex by its ID
router.put("/complex/:complex_id", (req, res) => {
  const { complex_id } = req.params;
  const { complex_name, address } = req.body;
  const updated_at = new Date();

  const query =
    "UPDATE complex SET complex_name = ?, address = ?, updated_at = ? WHERE complex_id = ?";
  db.query(
    query,
    [complex_name, address, updated_at, complex_id],
    (error, results) => {
      if (error)
        return res
          .status(500)
          .send({ success: false, message: "An error occurred" });
      res.send({ success: true, data: results });
    }
  );
});

// Delete a complex by its ID
router.delete("/complex/:complex_id", (req, res) => {
  const { complex_id } = req.params;

  const query = "DELETE FROM complex WHERE complex_id = ?";
  db.query(query, [complex_id], (error, results) => {
    if (error)
      return res
        .status(500)
        .send({ success: false, message: "An error occurred" });
    res.send({ success: true, data: results });
  });
});

module.exports = router;
