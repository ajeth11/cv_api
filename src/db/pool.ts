import mysql from 'mysql2/promise';

// Create a MySQL connection pool
export const pool = mysql.createPool({
  host: 'localhost',         // MySQL server host
  user: 'root',            // MySQL user
  password: 'root', // MySQL password
  database: 'cv_local', // MySQL database name
});


