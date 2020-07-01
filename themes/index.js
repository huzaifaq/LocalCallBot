const theme = {
	white: '#FFFFFF',
	gray: '#CCCCCC',
	lightGray: '#F2F2F2',
	textBlack: '#272727',
	textWhite: '#F4FAFF',
	activeText: 'red',
	utility: '#B2B2B2',
	background: '#313149',
	backgroundDark: '#212131',
	backgroundDarker: '#181825',
	backgroundLight: '#355257',
	backgroundLighter: '#0E98B0',
	backgroundIcon: '#21e6c1',
}

const dimensions = {
	wrapperMaxWidth: '1920px',
}

const zIndexes = {
	headerZ: 100,
	sidebarZ: 99,
	overlayZ: 98,
	elementsAboveVideoZ: 97,
	backgroundVideoZ: 96,
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
