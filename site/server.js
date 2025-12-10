import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '../.env' });

const { Pool } = pkg;
const app = express();
const PORT = 3001;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// API endpoint to fetch all public comments
app.get('/api/getAttendees', async (req, res) => {
  try {
    const meetingid = req.query.meetingid;
    const result = await pool.query('SELECT "id", "firstname"|| \' \' || "lastname" as "name", "role" FROM "Attendees" where "meeting_id" = ' + meetingid);
    console.log('meetingid:', meetingid); 
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});