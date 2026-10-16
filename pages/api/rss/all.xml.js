import { buildFeed, loadPosts, rssHandler } from '../../../lib/rss';

export default rssHandler(() =>
  buildFeed({
    title: 'Paul Blake - All Blog Posts',
    description: 'All blog posts including technology, development, theology, and more',
    pagePath: '/blog',
    feedPath: '/api/rss/all.xml',
    posts: [...loadPosts('technology'), ...loadPosts('theology')],
    limit: 30,
  })
);
