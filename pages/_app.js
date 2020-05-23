import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { ThemeProvider } from 'styled-components'

import configureStore from '../store'
import theme from '../themes'

import 'normalize.css'
import '../public/css/common.css'
import 'lazysizes'

class SoundLocalBot extends App {
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

export default withRedux(configureStore)(SoundLocalBot)
