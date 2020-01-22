import React from 'react'

const dataObject = {
	'@context': 'http://schema.org',
	'@type': 'WebSite',
	name: 'Crafted Jewellers',
	url: 'https://craftedjewellers.in/',
}

const WebSite = () => (
	<script
		type="application/ld+json"
		dangerouslySetInnerHTML={{
			__html: JSON.stringify(dataObject),
		}}
	/>
)

export default WebSite
