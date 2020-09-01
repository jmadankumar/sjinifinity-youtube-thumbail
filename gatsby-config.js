module.exports = {
  siteMetadata: {
    title: `Sjinfinity thumbnail`,
    description: `Sjinfinity youtube thumbnail generator`,
    author: `Madan Kumar`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sjinfinity youtube thumbnail generator`,
        short_name: `Sjinfinity thumbnail`,
        start_url: `/`,
        background_color: `#48bb78`,
        theme_color: `#48bb78`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-172842755-1'
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
