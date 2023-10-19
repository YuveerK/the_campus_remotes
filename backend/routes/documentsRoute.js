// documentsRouter.js
const express = require("express");
const router = express.Router();
const db = require("../database/db.config");
const multer = require("multer");
let filePath = "";

const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const fileName =
      new Date().toISOString().replace(/:/g, "-") + file.originalname;
    cb(null, fileName);
    filePath = fileName;
  },
});
const upload = multer({ storage });

// CREATE
router.post("/upload-document", upload.single("documentFile"), (req, res) => {
  const { owner_id, tenant_id, fileName } = req.body;

  const query =
    "INSERT INTO documents (owner_id, tenant_id, file_name, file_path) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [owner_id, tenant_id, fileName, filePath],
    (error, results) => {
      if (error) return res.status(500).send(error);
      res.status(201).send(results);
    }
  );
});

// READ OWNERS DOCUMENTS
router.get("/get-owner-documents/:owner_id", (req, res) => {
  const { owner_id } = req.params;
  const query = "SELECT * FROM documents WHERE owner_id = ?";
  db.query(query, [owner_id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.send(results);
  });
});

// READ TENANTS DOCUMENTS
router.get("/get-tenant-documents/:tenant_id", (req, res) => {
  const { tenant_id } = req.params;
  const query = "SELECT * FROM documents WHERE tenant_id = ?";
  db.query(query, [tenant_id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.send(results);
  });
});

// READ
router.get("/get-document/:documents_id", (req, res) => {
  const { documents_id } = req.params;
  const query = "SELECT * FROM documents WHERE documents_id = ?";
  db.query(query, [documents_id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.send(results);
  });
});

router.put(
  "/update-document/:documents_id",
  upload.single("documentFile"),
  (req, res) => {
    const { documents_id } = req.params;
    const { owner_id, tenant_id, file_name } = req.body;

    const getDocumentQuery = "SELECT * FROM documents WHERE documents_id = ?";
    db.query(getDocumentQuery, [documents_id], (error, results) => {
      if (error) return res.status(500).send(error);

      if (req.file) {
        const existingFilePath = results[0]?.file_path;
        if (existingFilePath) {
          const fullPath = path.join(__dirname, "../uploads", existingFilePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
      } else {
        filePath = results[0]?.file_path; // If no new file is provided, use the existing path.
      }

      const updateQuery =
        "UPDATE documents SET owner_id = ?, tenant_id = ?, file_name = ?, file_path = COALESCE(?, file_path) WHERE documents_id = ?";
      db.query(
        updateQuery,
        [owner_id, tenant_id, file_name, filePath, documents_id],
        (error, results) => {
          if (error) return res.status(500).send(error);
          res.send(results);
        }
      );
    });
  }
);
// DELETE
router.delete("/delete-document/:documents_id", (req, res) => {
  const { documents_id } = req.params;
  const query = "DELETE FROM documents WHERE documents_id = ?";
  db.query(query, [documents_id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.send(results);
  });
});

module.exports = router;
