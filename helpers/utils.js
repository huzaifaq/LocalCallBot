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

export default undefined
