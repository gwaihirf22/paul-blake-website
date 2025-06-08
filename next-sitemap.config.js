/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://paul-blake.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    }
  },
} 