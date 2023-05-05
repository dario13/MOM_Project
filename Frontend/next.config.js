const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['placeimg.com'],
  },
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@dario13/backend'],
}
