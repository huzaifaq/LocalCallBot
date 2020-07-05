import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { registerServiceWorker } from '../helpers/utils'
import { websiteDescription, websiteTitle } from '../helpers/constants'

const env = {
	TIER: process.env.TIER,
	VERSION: process.env.npm_package_version,
	PROTOCOL: process.env.PROTOCOL,
	PORT: process.env.PORT,
}

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props =>
						sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<React.Fragment>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</React.Fragment>
				),
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content="#cccccc" />
					<meta name="Description" content={websiteDescription} />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, minimum-scale=1, minimal-ui"
					/>
					<meta property="og:title" content={websiteTitle} />
					<meta property="og:type" content="webite" />
					<meta
						property="og:url"
						content="https://bot.huzaifa.info/"
					/>
					<meta
						property="og:image"
						content="https://bot.huzaifa.info/images/icons/bot-192.png"
					/>
					<meta
						property="og:description"
						content={websiteDescription}
					/>
					<link rel="manifest" href="/manifest.json" />
					<link
						rel="apple-touch-icon"
						href="/images/icons/bot-192.png"
					/>
					{registerServiceWorker()}
				</Head>
				<body>
					<noscript>
						<h2>
							Javascript is disabled. Please enable javascript and
							reload the page.
						</h2>
					</noscript>
					<Main />
					<NextScript />
					<script
						dangerouslySetInnerHTML={{
							__html: `__ENV__ = ${JSON.stringify(env)}`,
						}}
					/>
				</body>
			</Html>
		)
	}
}

export default MyDocument
