import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import withLayout from '../components/Layout'

const Section = styled.div`
	width: 400px;
	height: 400px;
	background-color: gray;
`

const Index = () => {
	useEffect(() => {
		// on page load
	}, [])

	return (
		<React.Fragment>
			<Section>HELLO FROM THE OTHER SIDE</Section>
		</React.Fragment>
	)
}

export default connect()(withLayout(Index))
