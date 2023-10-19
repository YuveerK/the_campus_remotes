const db = require("../database/db.config");
const express = require("express");
const router = express.Router();

router.post("/property-info", (req, res) => {
  const { complex_id, owner_id, tenant_address, unit, bedrooms, bathrooms } =
    req.body;

  const query =
    "INSERT INTO property ( complex_id, owner_id, tenant_address, unit, bedrooms, bathrooms) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [complex_id, owner_id, tenant_address, unit, bedrooms, bathrooms],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).send(results);
    }
  );
});

router.get("/property-info", (req, res) => {
  const query = "SELECT * FROM property";
  db.query(query, (error, results) => {
    if (error) return res.status(500).send(error);
    res.send(results);
  });
});

router.get("/owner-property-info/:owner_id", (req, res) => {
  const { owner_id } = req.params;

  const query = "SELECT * FROM property WHERE owner_id = ?";
  db.query(query, [owner_id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.send(results);
  });
});

router.get("/property-info/:property_id", (req, res) => {
  const { property_id } = req.params;

  const query = `
    SELECT p.*, c.complex_name 
    FROM property as p
    INNER JOIN complex as c
    on c.complex_id = p.complex_id 
    WHERE property_id = ?
  
  `;
  try {
    db.query(query, [property_id], (error, results) => {
      if (error) return res.status(500).send(error);
      res.send(results);
      console.log(property_id);
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/update-property/:property_id", (req, res) => {
  const { property_id } = req.params;
  const { complex_id, owner_id, tenant_address, unit, bedrooms, bathrooms } =
    req.body;

  const query =
    "UPDATE property SET complex_id = ?, owner_id = ?, tenant_address = ?, unit = ?, bedrooms = ?, bathrooms = ? WHERE property_id = ?";
  db.query(
    query,
    [
      complex_id,
      owner_id,
      tenant_address,
      unit,
      bedrooms,
      bathrooms,
      property_id,
    ],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.send(results);
    }
  );
});

router.delete("/property-info/:property_id", (req, res) => {
  const { property_id } = req.params;

  const query = "DELETE FROM property WHERE property_id = ?";
  db.query(query, [property_id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.send(results);
  });
});

module.exports = router;
