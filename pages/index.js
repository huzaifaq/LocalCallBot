import { connect } from 'react-redux'

import withLayout from '../components/Layout'

const Index = () => {
	return (
		<React.Fragment>
			<h1>Home</h1>
		</React.Fragment>
	)
}

const mapStateToProps = () => {
	return {}
}

export default connect(mapStateToProps)(withLayout(Index))
