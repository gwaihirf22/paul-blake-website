import { buildFeed, loadPosts, rssHandler } from '../../../lib/rss';

export default rssHandler(() =>
  buildFeed({
    title: 'Paul Blake - Theology Posts',
    description: 'Latest theology and faith-related blog posts',
    pagePath: '/blog/theology',
    feedPath: '/api/rss/theology.xml',
    posts: loadPosts('theology'),
  })
);
