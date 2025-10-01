import fs from 'fs';
import path from 'path';

// Path to store RSVPs
const RSVP_FILE = path.join(process.cwd(), 'data', 'party-rsvps.json');

// Read existing RSVPs
function readRSVPs() {
  if (!fs.existsSync(RSVP_FILE)) {
    return [];
  }
  const data = fs.readFileSync(RSVP_FILE, 'utf8');
  return JSON.parse(data);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple password protection - check query parameter
  const { password } = req.query;
  const correctPassword = process.env.PARTY_ADMIN_PASSWORD || 'lucysparty2025';

  if (password !== correctPassword) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const rsvps = readRSVPs();

    return res.status(200).json({
      success: true,
      count: rsvps.length,
      rsvps
    });
  } catch (error) {
    console.error('Error reading RSVPs:', error);
    return res.status(500).json({
      error: 'Failed to read RSVPs',
      details: error.message
    });
  }
}
