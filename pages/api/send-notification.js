import MailerLite from '@mailerlite/mailerlite-nodejs';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY,
});

// Group IDs mapping - MailerLite group IDs from dashboard
const GROUP_IDS = {
  blog: "161750636988204571", // Technology Posts group ID
  theology: "161750656038733632", // Theology Posts group ID
};

function generateEmailTemplate(post, category) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paul-blake.com';
  const postUrl = `${siteUrl}/blog${category === 'theology' ? '/theology' : ''}/${post.slug}`;

  return {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Blog Post: ${post.title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .email-container {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #0066cc;
          }
          .header h1 {
            color: #0066cc;
            font-size: 24px;
            margin: 0;
          }
          .category-badge {
            display: inline-block;
            background: ${category === 'theology' ? '#8b5a3c' : '#0066cc'};
            color: white;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 15px;
          }
          .post-title {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin: 0 0 15px 0;
            line-height: 1.3;
          }
          .post-meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 25px;
          }
          .post-excerpt {
            color: #555;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-left: 4px solid #0066cc;
            border-radius: 4px;
          }
          .cta-button {
            display: inline-block;
            background: #0066cc;
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: background-color 0.2s;
          }
          .cta-button:hover {
            background: #0052a3;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .footer a {
            color: #0066cc;
            text-decoration: none;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            color: #0066cc;
            text-decoration: none;
            margin: 0 10px;
          }
          @media (max-width: 600px) {
            body { padding: 10px; }
            .email-container { padding: 20px; }
            .post-title { font-size: 24px; }
            .cta-button { display: block; text-align: center; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Paul Blake's Blog</h1>
          </div>
          
          <div class="category-badge">${category === 'theology' ? 'Theology' : 'Technology'}</div>
          
          <h2 class="post-title">${post.title}</h2>
          
          <p class="post-meta">
            Published on ${new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} by Paul Blake
            ${post.readingTime ? ` • ${post.readingTime} min read` : ''}
          </p>
          
          <div class="post-excerpt">
            ${post.excerpt || 'A new blog post has been published. Click below to read the full article.'}
          </div>
          
          <div style="text-align: center;">
            <a href="${postUrl}" class="cta-button">Read Full Post</a>
          </div>
          
          <div class="social-links" style="text-align: center;">
            <a href="${siteUrl}/blog">Browse All Posts</a> • 
            <a href="${siteUrl}/blog${category === 'theology' ? '/theology' : ''}">More ${category === 'theology' ? 'Theology' : 'Tech'} Posts</a>
          </div>
          
          <div class="footer">
            <p>You're receiving this because you subscribed to Paul Blake's blog updates.</p>
            <p>
              <a href="${postUrl}">View in browser</a> • 
              <a href="${siteUrl}">Visit Website</a>
            </p>
            <p>Paul Blake • Software Developer & Writer</p>
          </div>
        </div>
      </body>
      </html>
    `,
    plain_text: `
New Blog Post: ${post.title}

Category: ${category === 'theology' ? 'Theology' : 'Technology'}
Published: ${new Date(post.date).toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}${post.readingTime ? ` • ${post.readingTime} min read` : ''}

${post.excerpt || 'A new blog post has been published.'}

Read the full post: ${postUrl}

---

You're receiving this because you subscribed to Paul Blake's blog updates.
Visit website: ${siteUrl}
    `.trim()
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic authentication check
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.NOTIFICATION_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { slug, category = 'blog' } = req.body;

  if (!slug) {
    return res.status(400).json({ error: 'Post slug is required' });
  }

  try {
    // Read the post file
    const postPath = category === 'theology' 
      ? path.join(process.cwd(), 'content/blog/theology', `${slug}.mdx`)
      : path.join(process.cwd(), 'content/blog', `${slug}.mdx`);

    if (!fs.existsSync(postPath)) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const fileContents = fs.readFileSync(postPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

    // Create excerpt from content (first 200 characters)
    const excerpt = content.replace(/[#*`]/g, '').substring(0, 200).trim() + '...';

    const post = {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      author: frontmatter.author || 'Paul Blake',
      readingTime: readingTimeMinutes,
      excerpt
    };

    const { html, plain_text } = generateEmailTemplate(post, category);

    // Determine which group to send to
    const groupId = GROUP_IDS[category];
    
    if (!groupId) {
      return res.status(400).json({
        error: 'Group ID not configured',
        note: 'Please set up group IDs in the MailerLite dashboard and update the code'
      });
    }

    const results = [];

    try {
      // Create a campaign in MailerLite
      const subject = `${category === 'theology' ? '[Theology] ' : ''}New Post: ${post.title}`;
      
      // Correct MailerLite campaign structure
      const campaign = await mailerlite.campaigns.create({
        name: `Blog Notification: ${post.title}`,
        type: 'regular',
        emails: [{
          subject: subject,
          from_name: 'Paul Blake',
          from: process.env.ADMIN_EMAIL || 'email.blog@paul-blake.com',
          content: html,
          plain_text: plain_text
        }],
        groups: [groupId]
      });

      // Send the campaign
      if (campaign.data?.id) {
        await mailerlite.campaigns.send(campaign.data.id);
        
        results.push({
          group_id: groupId,
          status: 'sent',
          campaign_id: campaign.data.id,
          subject: subject
        });
      } else {
        results.push({
          group_id: groupId,
          status: 'error',
          error: 'Failed to create campaign'
        });
      }

          } catch (error) {
        console.error(`Error sending to group ${groupId}:`, error);
        console.error('Full error details:', JSON.stringify(error.response?.data || error, null, 2));
        results.push({
          group_id: groupId,
          status: 'error',
          error: error.message,
          details: error.response?.data || 'No additional details'
        });
      }

    const hasErrors = results.some(r => r.status === 'error');
    
    return res.status(hasErrors ? 207 : 200).json({
      message: hasErrors ? 'Partially successful' : 'Notifications sent successfully',
      post: {
        title: post.title,
        slug: post.slug,
        category
      },
      results
    });

  } catch (error) {
    console.error('Notification sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send notifications',
      details: error.message 
    });
  }
}