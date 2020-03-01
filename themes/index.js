const theme = {
	white: '#FFFFFF',
	gray: '#CCCCCC',
	lightGray: '#F2F2F2',
	textBlack: '#272727',
	activeText: '#BC9358',
	gold: 'gold',
	lightBrown: '#B5A59B',
}

const dimensions = {
	wrapperMaxWidth: '1920px',
}

const zIndexes = {
	headerZ: 100,
	overlayZ: 99,
	backgroundVideoZ: 97,
	elementsAboveVideoZ: 98,
}

const size = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px',
}

export const device = {
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	laptopL: `(min-width: ${size.laptopL})`,
	desktop: `(min-width: ${size.desktop})`,
	desktopL: `(min-width: ${size.desktop})`,
}

export default {
	...theme,
	...dimensions,
	...zIndexes,
	...device,
}
