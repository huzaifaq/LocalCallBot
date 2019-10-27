// We require normalize.css to be loaded
const withCSS = require('@zeit/next-css')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
	withCSS({
		poweredByHeader: false,
	})
)
