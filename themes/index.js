const theme = {
	white: '#FFFFFF',
	gray: '#CCCCCC',
	lightGray: '#F2F2F2',
	textBlack: '#272727',
	activeText: '#FF3B00',
	gold: 'gold',
}

const dimensions = {
	wrapperMaxWidth: '1920px',
}

const zIndexes = {
	headerZ: 99,
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
	laptop: `(max-width: ${size.laptop})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktop: `(max-width: ${size.desktop})`,
	desktopL: `(max-width: ${size.desktop})`,
}

export default {
	...theme,
	...dimensions,
	...zIndexes,
	...device,
}
