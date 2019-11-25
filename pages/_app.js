import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { ThemeProvider } from 'styled-components'

import configureStore from '../store'
import theme from '../themes'

import 'normalize.css'
import '../public/css/common.css'
import 'lazysizes'

class CraftedJewellers extends App {
	// Only uncomment this method if you have blocking data requirements for
	// every single page in your application. This disables the ability to
	// perform automatic static optimization, causing every page in your app to
	// be server-side rendered.
	// static async getInitialProps(appContext) {
	// 	// calls page's `getInitialProps` and fills `appProps.pageProps`
	// 	const appProps = await App.getInitialProps(appContext)

	// 	return { ...appProps }
	// }

	render() {
		const { Component, pageProps, store } = this.props
		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</Provider>
		)
	}
}

export default withRedux(configureStore)(CraftedJewellers)
