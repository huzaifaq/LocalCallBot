// We require normalize.css to be loaded
const withCSS = require('@zeit/next-css')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const options = {
	poweredByHeader: false,
	compress: process.env.PROTOCOL !== 'HTTP2', // Has to be disabled when using HTTP2
}

module.exports = withBundleAnalyzer(withCSS(options))
