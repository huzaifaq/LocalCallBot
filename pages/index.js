import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'

import withLayout from '../components/Layout'

const Index = props => {
	const { shows } = props
	return (
		<React.Fragment>
			<h1>My Blog</h1>
			<ul>
				{shows.map(show => (
					<li key={show.id}>
						<Link href="/p/[id]" as={`/p/${show.id}`}>
							<div>{show.name}</div>
						</Link>
					</li>
				))}
			</ul>
		</React.Fragment>
	)
}

Index.getInitialProps = async () => {
	const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
	const data = await res.json()

	return {
		shows: data.map(entry => entry.show),
	}
}

Index.defaultProps = {
	shows: [],
}

Index.propTypes = {
	shows: PropTypes.shape([]),
}

export default withLayout(Index)
