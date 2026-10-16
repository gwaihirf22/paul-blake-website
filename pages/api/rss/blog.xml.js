// Technology feed. The route keeps its historical name (blog.xml) because it is
// linked from the blog pages, the subscription form and existing subscribers.
import { buildFeed, loadPosts, rssHandler } from '../../../lib/rss';

export default rssHandler(() =>
  buildFeed({
    title: 'Paul Blake - Technology Posts',
    description: 'Latest posts about development, technology, and more',
    pagePath: '/blog/technology',
    feedPath: '/api/rss/blog.xml',
    posts: loadPosts('technology'),
  })
);
