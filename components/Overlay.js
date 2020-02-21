import PropTypes from 'prop-types'
import styled from 'styled-components'

const OverlayWrapper = styled.div`
	background-color: ${props => props.theme.lightBrown};
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	transition: all 0.3s ease-in;
	opacity: 0.3;
	z-index: ${props => props.theme.elementsAboveVideoZ};

	&.fade-enter {
		opacity: 0;
	}

	&.fade-enter-active {
		opacity: 0.3;
	}

	&.fade-exit {
		opacity: 0.3;
	}

	&.fade-exit-active {
		opacity: 0;
	}
`

const Overlay = props => {
	const { onClick } = props
	return <OverlayWrapper onClick={onClick} />
}

Overlay.defaultProps = {
	onClick: () => null,
}

Overlay.propTypes = {
	onClick: PropTypes.func,
}

export default Overlay
