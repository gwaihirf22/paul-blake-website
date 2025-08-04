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

  const { email, categories } = req.body;

  // Validate email
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const results = [];
    
    // Determine which groups to unsubscribe from
    let groupsToUnsubscribe = [];
    
    if (!categories || categories.length === 0 || categories.includes('all')) {
      // Unsubscribe from all groups
      groupsToUnsubscribe = ['blog', 'theology'];
    } else {
      groupsToUnsubscribe = Array.isArray(categories) ? categories : [categories];
    }

    // Get group IDs for unsubscription
    const groupIds = groupsToUnsubscribe
      .map(cat => GROUP_IDS[cat])
      .filter(id => id !== null);

    try {
      // Find the subscriber first
      const subscribers = await mailerlite.subscribers.get({
        filter: {
          email: email
        }
      });

      if (!subscribers.data || subscribers.data.length === 0) {
        return res.status(404).json({
          error: 'Email address not found in our subscription list'
        });
      }

      const subscriber = subscribers.data[0];
      const subscriberId = subscriber.id;

      // If we have specific group IDs, remove from those groups
      if (groupIds.length > 0) {
        for (const groupId of groupIds) {
          try {
            await mailerlite.groups.removeSubscriber(groupId, subscriberId);
            results.push({
              group_id: groupId,
              status: 'unsubscribed'
            });
          } catch (error) {
            console.error(`Error removing from group ${groupId}:`, error);
            results.push({
              group_id: groupId,
              status: 'error',
              error: error.message
            });
          }
        }
      } else {
        // If no specific groups or we want to unsubscribe from everything,
        // we can set the subscriber status to unsubscribed
        try {
          await mailerlite.subscribers.update(subscriberId, {
            status: 'unsubscribed'
          });
          results.push({
            action: 'global_unsubscribe',
            status: 'unsubscribed'
          });
        } catch (error) {
          console.error('Error with global unsubscribe:', error);
          results.push({
            action: 'global_unsubscribe',
            status: 'error',
            error: error.message
          });
        }
      }

      // MailerLite handles unsubscribe confirmation emails automatically
      // but we can log that it's handled
      results.push({
        type: 'confirmation',
        status: 'handled_by_mailerlite'
      });

    } catch (error) {
      console.error('MailerLite unsubscribe error:', error);
      
      if (error.status === 404) {
        return res.status(404).json({
          error: 'Email address not found in our subscription list'
        });
      }
      
      results.push({
        status: 'error',
        error: error.message
      });
    }

    const hasErrors = results.some(r => r.status === 'error');
    
    return res.status(hasErrors ? 207 : 200).json({
      message: hasErrors ? 'Partially successful' : 'Successfully unsubscribed',
      email: email,
              results
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return res.status(500).json({ 
      error: 'Failed to process unsubscription',
      details: error.message 
    });
  }
}