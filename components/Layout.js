import styled from 'styled-components'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

const PageWrapper = styled.div`
	background-color: ${props => props.theme.lightGray};
	height: auto;
`

const WithLayoutWrapper = styled.div`
	background-color: ${props => props.theme.lightGray};
	margin: 0 auto;
	max-width: ${props => props.theme.wrapperMaxWidth};
	min-height: 900px;
`

const withLayout = Page => {
	const pageHoisted = props => {
		return (
			<PageWrapper>
				<Head>
					<title key="title">
						Crafted Jewellers - Jewellery Services
					</title>
				</Head>
				<Header />
				<WithLayoutWrapper>
					<Page {...props} />
				</WithLayoutWrapper>
				<Footer />
			</PageWrapper>
		)
	}

	if (Page.getInitialProps) {
		pageHoisted.getInitialProps = Page.getInitialProps
	}

	return pageHoisted
}

export default withLayout
