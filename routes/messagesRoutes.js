const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  // get all the messages and tags
  const message_and_tags = await db.query(
    `SELECT m.id, m.text, t.name
     FROM messages m
       JOIN messages_tags mt ON m.id=mt.message_id
       JOIN tags t ON mt.tag_id = t.id
     ORDER BY m.id`
  );

  // we're going to start a counter at 0
  let startIdx = 0;
  // here is the array we will return containing three message objects
  let messages = [];

  // let's loop over the data we got back from the query (an array of 5 objects similar to the table above)
  for (let i = 0; i < message_and_tags.rows.length; i++) {
    let currentMessage = message_and_tags.rows[i];
    // if our counter is NOT the same as the message id
    if (startIdx !== currentMessage.id) {
      // set the counter to be that message id
      startIdx = currentMessage.id;
      // create a property called tags which is an empty array
      currentMessage.tags = [];
      // add the name of the tag to the tags array
      currentMessage.tags.push(currentMessage.name);
      // get rid of the key of .name on our current message
      delete currentMessage.name;
      // add that current message to our array
      messages.push(currentMessage);
    } else {
      // if the counter is the same as the message id (same message, different tag)
      // add the name of that tag to the message at the correct index in our messages array
      messages[startIdx - 1].tags.push(currentMessage.name);
    }
  }
  return res.send(messages);
});

router.post("/", async (req, res, next) => {
  try {
    const result = await db.query(
      "INSERT INTO messages (text) VALUES ($1) RETURNING *",
      [req.body.text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


router.patch("/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      "UPDATE message SET text=$1 WHERE id=$2 RETURNING *",
      [req.body.text, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      "DELETE FROM messages WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
