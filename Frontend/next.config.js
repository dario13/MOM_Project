const withTM = require('next-transpile-modules')(['@dario13/backend'])

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['placeimg.com'],
  },
})
