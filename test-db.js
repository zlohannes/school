const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'test.db');
console.log('Testing SQLite write to:', dbPath);

const db = new sqlite3.Database(dbPath);

db.on('error', (err) => {
  console.error('Database error:', err);
});

db.run('CREATE TABLE IF NOT EXISTS test (id INTEGER, name TEXT)', (err) => {
  if (err) {
    console.error('Create table error:', err);
    return;
  }
  console.log('Table created');

  db.run('INSERT INTO test VALUES (?, ?)', [1, 'hello'], (err) => {
    if (err) {
      console.error('Insert error:', err);
    } else {
      console.log('Insert OK');
    }

    db.all('SELECT * FROM test', (err, rows) => {
      if (err) {
        console.error('Select error:', err);
      } else {
        console.log('Rows:', rows);
      }
      db.close();
    });
  });
});
