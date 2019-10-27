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

export default undefined
