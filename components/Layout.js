import styled from 'styled-components'
import Head from 'next/head'
import { websiteTitle } from '../helpers/constants'

import Header from './Header/Header'

const PageWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	background-color: ${props => props.theme.background};
	height: auto;
	justify-content
`

const WithLayoutWrapper = styled.div`
	background-color: ${props => props.theme.background};
	width: 100%;
	height: 100%;
	padding: 16px;
`

const withLayout = Page => {
	const pageHoisted = props => {
		return (
			<PageWrapper>
				<Head>
					<title key="title">{websiteTitle}</title>
				</Head>
				<Header />
				<WithLayoutWrapper>
					<Page {...props} />
				</WithLayoutWrapper>
			</PageWrapper>
		)
	}

	if (Page.getInitialProps) {
		pageHoisted.getInitialProps = Page.getInitialProps
	}

	return pageHoisted
}

export default withLayout
