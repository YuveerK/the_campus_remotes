const db = require("../database/db.config");
const express = require("express");
const router = express.Router();

// Create endpoint
router.post("/create-owner", async (req, res) => {
  const { id_number, name, surname, email, cell_phone_number } = req.body;
  const query =
    "INSERT INTO owner (owner_id, id_number, name, surname, email, cell_phone_number, created_at, updated_at) VALUES (UUID(), ?, ?, ?, ?, ?, NOW(), NOW())";

  try {
    db.query(
      query,
      [id_number, name, surname, email, cell_phone_number],
      (error, data) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).send({ owner_id: data.insertId });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all owners
router.get("/get-owners", (req, res) => {
  const query = "SELECT * FROM owner";

  db.query(query, (error, data) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).send(data);
    }
  });
});

// Get a single owner
router.get("/get-owner/:owner_id", (req, res) => {
  const query = "SELECT * FROM owner WHERE owner_id = ?";

  db.query(query, [req.params.owner_id], (error, data) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).send(data[0]);
    }
  });
});

router.put("/update-owner/:owner_id", (req, res) => {
  const { id_number, name, surname, email, cell_phone_number } = req.body;
  const query =
    "UPDATE owner SET id_number = ?, name = ?, surname = ?, email = ?, cell_phone_number = ?, updated_at = NOW() WHERE owner_id = ?";

  db.query(
    query,
    [id_number, name, surname, email, cell_phone_number, req.params.owner_id],
    (error, data) => {
      if (error) {
        res.status(400).json(error);
      } else {
        const query = "SELECT * FROM owner WHERE owner_id = ?";

        db.query(query, [req.params.owner_id], (error, data) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(200).send(data[0]);
          }
        });
      }
    }
  );
});

router.delete("/:owner_id", (req, res) => {
  const query = "DELETE FROM owner WHERE owner_id = ?";

  db.query(query, [req.params.owner_id], (error, data) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).send({ message: "Owner deleted successfully" });
    }
  });
});

module.exports = router;
