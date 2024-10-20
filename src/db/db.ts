import { pool } from "./pool";


// Function to connect and query the database
export async function connectDB() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    connection.release();
  } catch (error) {
    console.error('Database connection error:', error);
  }
}
