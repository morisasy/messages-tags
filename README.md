# *Node.js Express RESTful Message-tags App with Postgres*

## **Prerequisites**
 + createdb messagestags
 + psql messages-tags



## **Instructions**

  1. mkdir messages-tags
  2. cd messages-tags
  3. touch app.js
  4. mkdir routes db
  5. touch db/index.js
  6. touch routes/messages.js
  7. touch routes/tags.js

## **Installation**

 + npm init -y
 + npm install express morgan body-parser pg



```

CREATE TABLE messages (id SERIAL PRIMARY KEY, text TEXT);

CREATE TABLE tags (id SERIAL PRIMARY KEY, name TEXT);

CREATE TABLE messages_tags (id SERIAL PRIMARY KEY, message_id INTEGER REFERENCES messages (id) ON DELETE CASCADE, tag_id INTEGER REFERENCES tags (id) ON DELETE CASCADE);

INSERT INTO messages (text) VALUES ('first'), ('second'), ('third');

INSERT INTO tags (name) VALUES ('funny'), ('happy'), ('silly');

INSERT INTO messages_tags (message_id, tag_id) VALUES (1,1), (1,2), (2,1), (2,3), (3,3);



```
