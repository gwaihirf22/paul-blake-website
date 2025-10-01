import fs from 'fs';
import path from 'path';

// Path to store RSVPs
const RSVP_FILE = path.join(process.cwd(), 'data', 'party-rsvps.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read existing RSVPs
function readRSVPs() {
  ensureDataDirectory();
  if (!fs.existsSync(RSVP_FILE)) {
    return [];
  }
  const data = fs.readFileSync(RSVP_FILE, 'utf8');
  return JSON.parse(data);
}

// Write RSVPs to file
function writeRSVPs(rsvps) {
  ensureDataDirectory();
  fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2), 'utf8');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    guestName,
    guestCount,
    attending,
    email,
    phone,
    bookTitle,
    dietaryNeeds,
    message
  } = req.body;

  // Validate required fields
  if (!guestName || !guestCount || attending === undefined) {
    return res.status(400).json({ error: 'Missing required fields: guestName, guestCount, and attending are required' });
  }

  // Validate email if provided
  if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Create RSVP object
    const rsvp = {
      id: Date.now(),
      guestName,
      guestCount: parseInt(guestCount),
      attending,
      email: email || '',
      phone: phone || '',
      bookTitle: bookTitle || '',
      dietaryNeeds: dietaryNeeds || '',
      message: message || '',
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        dateStyle: 'short',
        timeStyle: 'short'
      })
    };

    // Read existing RSVPs
    const rsvps = readRSVPs();

    // Add new RSVP
    rsvps.push(rsvp);

    // Write back to file
    writeRSVPs(rsvps);

    console.log('RSVP received:', {
      id: rsvp.id,
      guest: guestName,
      count: guestCount,
      attending,
      email: email || 'No email provided'
    });

    return res.status(200).json({
      success: true,
      message: '🕷️ Amazing! Your RSVP has been received! 🕸️',
      rsvp: {
        guestName,
        guestCount,
        attending,
        hasEmail: !!email
      }
    });

  } catch (error) {
    console.error('RSVP submission error:', error);

    return res.status(500).json({
      error: 'Failed to submit RSVP. Please try again or contact Paul directly.',
      details: error.message
    });
  }
}
