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

module.exports = {
  fetchUsersFromDatabase,
  insertUserIntoDatabase
};
