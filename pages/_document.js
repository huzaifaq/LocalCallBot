import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { registerServiceWorker } from '../helpers/utils'

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
			<Html>
				<Head lang="en">
					<meta name="theme-color" content="#cccccc" />
					<meta
						name="Description"
						content="Jerjis's Jewellery Store"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link
						rel="apple-touch-icon"
						href="/images/icons/jz-jewels-initials-192.png"
					/>
					{registerServiceWorker()}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
