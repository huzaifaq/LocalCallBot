import styled from 'styled-components'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

import 'normalize.css'
import '../public/css/common.css'

const WithLayoutWrapper = styled.div`
	padding: 50px;
	min-height: 900px;
`

const withLayout = Page => {
	const pageHoisted = props => {
		return (
			<React.Fragment>
				<Head>
					<title key="title">Jerjis's Jewellery Store</title>
				</Head>
				<Header />
				<WithLayoutWrapper>
					<Page {...props} />
				</WithLayoutWrapper>
				<Footer />
			</React.Fragment>
		)
	}

	if (Page.getInitialProps) {
		pageHoisted.getInitialProps = Page.getInitialProps
	}

	return pageHoisted
}

export default withLayout
