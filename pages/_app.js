import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { ThemeProvider } from 'styled-components'

import 'normalize.css'

import configureStore from '../store'

import Header from '../components/Header'
import Footer from '../components/Footer'
import theme from '../themes'

class JZJewels extends App {
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
					<Header />
					<Component {...pageProps} />
					<Footer />
				</ThemeProvider>
			</Provider>
		)
	}
}

export default withRedux(configureStore)(JZJewels)
