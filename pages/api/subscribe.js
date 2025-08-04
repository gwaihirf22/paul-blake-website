import MailerLite from '@mailerlite/mailerlite-nodejs';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY,
});

// Group IDs mapping - MailerLite group IDs from dashboard
const GROUP_IDS = {
  all: "161750623746786929", // All Blog Posts group ID
  blog: "161750636988204571", // Technology Posts group ID
  theology: "161750656038733632", // Theology Posts group ID
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, categories = ['all'] } = req.body;

  // Validate email
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Validate categories
  const validCategories = ['all', 'blog', 'theology'];
  const requestedCategories = Array.isArray(categories) ? categories : [categories];
  const invalidCategories = requestedCategories.filter(cat => !validCategories.includes(cat));
  
  if (invalidCategories.length > 0) {
    return res.status(400).json({ error: 'Invalid categories' });
  }

  try {
    const results = [];
    
    // Determine which groups to subscribe to
    let groupsToSubscribe = [];
    
    if (requestedCategories.includes('all')) {
      // Subscribe to both blog and theology groups
      groupsToSubscribe = ['blog', 'theology'];
    } else {
      groupsToSubscribe = requestedCategories.filter(cat => cat !== 'all');
    }

    // Get group IDs for subscription
    const groupIds = groupsToSubscribe
      .map(cat => GROUP_IDS[cat])
      .filter(id => id !== null);

    // For now, we'll create the subscriber without groups and add them manually
    // This is because we need to set up the groups in MailerLite first
    
    try {
      // Create or update subscriber
      const subscriberData = {
        email,
        fields: {
          name: '', // Can be updated later if you collect names
          source: 'website',
          subscription_categories: requestedCategories.join(', ')
        }
      };

      if (groupIds.length > 0) {
        subscriberData.groups = groupIds;
      }

      const subscriber = await mailerlite.subscribers.createOrUpdate(subscriberData);
      
      results.push({
        status: 'subscribed',
        subscriber_id: subscriber.data?.id,
        email: email,
        categories: requestedCategories
      });

    } catch (error) {
      console.error('MailerLite subscription error:', error);
      
      if (error.status === 422) {
        // Validation error - subscriber might already exist
        results.push({
          status: 'already_subscribed',
          email: email,
          categories: requestedCategories
        });
      } else {
        results.push({
          status: 'error',
          error: error.message,
          email: email
        });
      }
    }

    // Send confirmation email using MailerLite (optional - MailerLite can handle this automatically)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paul-blake.com';
    
    try {
      // Note: MailerLite has built-in confirmation emails, but we can send a custom welcome email
      // This would require setting up a campaign or automation in MailerLite
      results.push({ type: 'confirmation', status: 'handled_by_mailerlite' });
    } catch (emailError) {
      console.error('Error with confirmation process:', emailError);
      results.push({ type: 'confirmation', status: 'error', error: emailError.message });
    }

    const hasErrors = results.some(r => r.status === 'error');
    
    return res.status(hasErrors ? 207 : 200).json({
      message: hasErrors ? 'Partially successful' : 'Successfully subscribed',
              results
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: 'Failed to process subscription',
      details: error.message 
    });
  }
}