import styled, { keyframes } from 'styled-components'

export const placeHolderShimmer = keyframes`
	0% {
		background-position: -468px 0;
	}

	100% {
		background-position: 468px 0;
	}
`
export const LoadingCardTemplate = styled.div`
	width: 40px;
	height: 40px;
	border: 1px solid gray;
	margin: 10px 20px;
	background: #f6f7f8;
	background-image: linear-gradient(
		to right,
		#f6f7f8 0%,
		#e7e7e7 20%,
		#f6f7f8 40%,
		#f6f7f8 100%
	);
	background-repeat: no-repeat;
	background-size: 1400px auto;
	display: flex;
	position: relative;
	animation: ${placeHolderShimmer} 1s linear infinite forwards;
`

export const MenuItemHoverPill = styled.span`
	position: absolute;
	background-color: white;
	margin-top: ${props => (props.active ? '-20px' : 'unset')};
	top: 50%;
	left: -8px;
	width: 3px;
	height: ${props => (props.active ? '40px' : '0')};
	border-bottom-right-radius: 5px;
	border-top-right-radius: 5px;
	transition: 0.1s ease-in;
`
export const MenuItemImage = styled.div`
	display: flex;
    background-image: url('${p => p.imageSrc}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${props => props.theme.backgroundIcon};
	width: 48px;
	height: 48px;
	margin: 10px 0;
    cursor: pointer;
    transition: 0.15s ease-in;
	border-radius: ${props => (props.active ? '14px' : '24px')};
    &:hover {
            border-radius: 14px;
    }
`
export const MenuItemWrapper = styled.div`
	display: flex;
	position: relative;
	&:hover {
		${MenuItemHoverPill} {
			height: ${props => (props.active ? '40px' : '20px')};
			margin-top: ${props => (props.active ? '-20px' : '-10px')};
		}
	}
`

export const HeaderWrapper = styled.div`
	display: flex;
	width: 72px;
	height: calc(100vh - 16px);
	top: 0;
	padding: 8px 0;
	background-color: ${props => props.theme.backgroundDark};
	align-items: center;
	justify-content: center;
	z-index: ${props => props.theme.headerZ};
	user-select: none;
	position: sticky;
`
export const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	max-width: ${props => props.theme.wrapperMaxWidth};
`
export const MenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	width: 100%;
	align-items: center;
`
export const MenuSectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`
