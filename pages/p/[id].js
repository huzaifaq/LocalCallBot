import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'

import withLayout from '../../components/Layout'

const Post = props => {
	const { show } = props
	return (
		<React.Fragment>
			<h1>{show.name}</h1>
			<p>{show.summary.replace(/<[/]?[pb]>/g, '')}</p>
			<img src={show.image.medium} alt="poster" />
		</React.Fragment>
	)
}

Post.getInitialProps = async context => {
	const { id } = context.query
	const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
	const show = await res.json()

	console.log(`Fetched show: ${show.name}`)

	return { show }
}

Post.propTypes = {
	show: PropTypes.shape({
		name: PropTypes.string,
		summary: PropTypes.string,
		image: PropTypes.shape({
			medium: PropTypes.string,
		}),
	}).isRequired,
}

export default withLayout(Post)
