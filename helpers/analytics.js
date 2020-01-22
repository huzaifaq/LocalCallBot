/* global window gtag */
import { GTMID } from './constants'

export const TrackPageView = () => {
	const pathName = window.location.pathname
	gtag('config', GTMID, { page_path: pathName })
}

export default null
