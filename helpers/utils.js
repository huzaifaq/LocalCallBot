/* global window */

export const registerServiceWorker = () => {
	return (
		/* eslint-disable react/no-danger */
		<script
			type="text/javascript"
			dangerouslySetInnerHTML={{
				__html: `
					if ('serviceWorker' in navigator) {
						// Use the window load event to keep the page load performant
						window.addEventListener('load', () => {
							navigator.serviceWorker.register('/service-worker.js')
						})
					}
				`,
			}}
		/>
		/* eslint-disable react/no-danger */
	)
}

export const capitalizeSentence = value => {
	return value.replace(/(?:^|\s)\S/g, a => a.toUpperCase())
}

export const readIdentifierFromURL = value => {
	if (!value) return null
	return capitalizeSentence(value)
		.split('-')
		.join(' ')
}

export const convertToURLIdentifier = value => {
	if (!value) return null
	return value
		.toLowerCase()
		.split(' ')
		.join('-')
}

export const readTier = () => {
	/* eslint-disable no-underscore-dangle */
	if (typeof window !== 'undefined' && window.__ENV__) {
		return window.__ENV__.TIER || 'production'
	}
	if (process) {
		return process.env.TIER || 'production'
	}
	return 'production'
	/* eslint-enable no-underscore-dangle */
}

export const streamToString = async stream => {
	const decoder = new TextDecoder('utf-8')
	const reader = stream.getReader()
	let res = ''

	await reader.read().then(function processText({ done, value }) {
		if (done) {
			return
		}
		res += decoder.decode(value)
		// Read some more, and call this function again
		reader.read().then(processText)
	})

	return res
}

export default undefined
