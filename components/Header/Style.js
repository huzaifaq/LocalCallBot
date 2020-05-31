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
export const MenuItem = styled.div`
	display: flex;
    background-image: url('${p => p.imageSrc}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${props => props.theme.backgroundIcon};
    border-radius: 26px;
	width: 40px;
	height: 40px;
	margin: 10px 0;
    cursor: pointer;
    transition: 0.25s;
	border: ${props => (props.active ? '1px solid red' : '')};
    &:hover {
        @media ${props => props.theme.laptop} {
            border-radius: 18px;
        }
    }
`
export const HeaderWrapper = styled.div`
	display: flex;
	width: 60px;
	height: calc(100vh - 16px);
	top: 0;
	background-color: ${props => props.theme.white};
	align-items: center;
	padding: 8px;
	box-shadow: 0 0px 8px 0px ${props => props.theme.utility};
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
