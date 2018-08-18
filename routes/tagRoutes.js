const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const data = await db.query("SELECT * FROM tags");
    res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await db.query(
      "INSERT INTO tags (name) VALUES ($1) RETURNING *",
      [req.body.name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


router.patch("/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      "UPDATE tags SET name=$1 WHERE id=$2 RETURNING *",
      [req.body.name, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      "DELETE FROM tags WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
