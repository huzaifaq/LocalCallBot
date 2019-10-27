import styled from 'styled-components'

const WithLayoutWrapper = styled.div`
	padding: 50px;
	min-height: 2000px;
`

const withLayout = Page => {
	const pageHoisted = props => {
		return (
			<WithLayoutWrapper>
				<Page {...props} />
			</WithLayoutWrapper>
		)
	}

	if (Page.getInitialProps) {
		pageHoisted.getInitialProps = Page.getInitialProps
	}

	return pageHoisted
}

export default withLayout
