import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '../.env.local') });
} else {
  dotenv.config();
}

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


// get all towns from Towns table
app.get('/api/getTowns', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Towns"');
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

// get info for town by id
app.get('/api/getTownInfo', async (req, res) => {
  try {
    const townId = req.query.townId;
    const result = await pool.query('SELECT * FROM "Towns" WHERE "id" = $1', [townId]);
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// get town meetings by town id
app.get('/api/getTownMeetings', async (req, res) => {
  try {
    const townId = req.query.townId;
    const result = await pool.query('SELECT * FROM "Meetings" WHERE "townid" = $1 ORDER BY "date" DESC', [townId]);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// get meeting items by meeting id
app.get('/api/getMeetingItems', async (req, res) => {
  try {
    const meetingId = req.query.meetingId;
    const result = await pool.query('SELECT * FROM "Items" WHERE "meeting_id" = $1 ORDER BY "id" ASC', [meetingId]);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// get meeting info by meeting id
app.get('/api/getMeetingInfo', async (req, res) => {
  try {
    const meetingId = req.query.meetingId;
    const result = await pool.query('SELECT * FROM "Meetings" WHERE "id" = $1', [meetingId]);
    res.json({
      success: true,
      data: result.rows[0]
    });
  }
  catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// get public comments by meeting id
app.get('/api/getPublicComments', async (req, res) => {
  try {
    const meetingId = req.query.meetingId;
    const result = await pool.query('SELECT * FROM "PublicComments" WHERE "meeting_id" = $1 ORDER BY "id" ASC', [meetingId]);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// get updates by meeting id
app.get('/api/getUpdates', async (req, res) => {
  try {
    const meetingId = req.query.meetingId;
    const result = await pool.query('SELECT * FROM "Updates" WHERE "meeting_id" = $1 ORDER BY "id" ASC', [meetingId]);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// get attendees by meeting id
app.get('/api/getAttendees', async (req, res) => {
  try {
    const meetingId = req.query.meetingId;
    const result = await pool.query('SELECT "id", "firstname"|| \' \' || "lastname" as "name", "role" FROM "Attendees" WHERE "meeting_id" = $1 ORDER BY "id" ASC', [meetingId]);
    res.json({
      success: true,
      data: result.rows
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

// Serve React build
//const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'dist')));

// For all other routes, serve index.html (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});