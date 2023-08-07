// db.js
const pg = require('pg');

// Function to fetch users from the database
async function fetchUsersFromDatabase() {
  const conString = "postgres://mdkmnhui:bJXnvjYj8SwU_Tnc-h8b7B6nrfVjy5-8@heffalump.db.elephantsql.com/mdkmnhui";
  const client = new pg.Client(conString);

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM users;');
    return result.rows;
  } catch (err) {
    console.error('Error fetching users from the database:', err);
    return [];
  } finally {
    client.end();
  }
}

// Function to insert a user into the database
async function insertUserIntoDatabase(username, password) {
  const conString = "postgres://mdkmnhui:bJXnvjYj8SwU_Tnc-h8b7B6nrfVjy5-8@heffalump.db.elephantsql.com/mdkmnhui";
  const client = new pg.Client(conString);
  try {
    await client.connect();
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2);', [username, password]);
    console.log('User inserted successfully');
  } catch (err) {
    console.error('Error inserting user into the database:', err);
  } finally {
    client.end();
  }
}

// Function to fetch posts from the database
async function fetchPostsFromDatabase() {
  const conString = "postgres://mdkmnhui:bJXnvjYj8SwU_Tnc-h8b7B6nrfVjy5-8@heffalump.db.elephantsql.com/mdkmnhui";
  const client = new pg.Client(conString);

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM posts ORDER BY posted_at ASC;');
    return result.rows;
  } catch (err) {
    console.error('Error fetching posts from the database:', err);
    return [];
  } finally {
    client.end();
  }
}

// Function to insert a new post to the database
async function insertPostIntoDatabase(post_user, post_content) {
  const conString = "postgres://mdkmnhui:bJXnvjYj8SwU_Tnc-h8b7B6nrfVjy5-8@heffalump.db.elephantsql.com/mdkmnhui";
  const client = new pg.Client(conString);
  console.log(post_user)
  console.log(post_content)
  try {
    await client.connect();
    const result = await client.query('INSERT INTO posts (post_user, post_content) VALUES ($1, $2);', [post_user, post_content]);
    return result.rows;
  } catch (err) {
    console.error('Error inserting user into the database:', err);
    return [];
  } finally {
    client.end();
  }
}

module.exports = {
  fetchUsersFromDatabase,
  insertUserIntoDatabase,
  fetchPostsFromDatabase,
  insertPostIntoDatabase
};
