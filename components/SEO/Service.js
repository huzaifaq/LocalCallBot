import React from 'react'

const dataObject = {
	'@context': 'http://schema.org/',
	'@type': 'Service',
	serviceType: 'Jewellery maintenance',
	provider: {
		'@type': 'LocalBusiness',
		name: 'Crafted Jewellers',
		image:
			'https://craftedjewellers.in/images/icons/crafted-jewellers-logo-594x60.png',
		telephone: '+919930757552',
		email: 'support@craftedjewellers.in',
		priceRange: '$$$',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Al-Javherat, Juhu Circle, JVPD Scheme',
			addressLocality: 'Mumbai',
			addressRegion: 'Maharashtra',
			addressCountry: 'India',
			postalCode: '400049',
		},
	},
	areaServed: {
		'@type': 'Country',
		name: 'India',
	},
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Jewellery maintenance',
		itemListElement: [
			{
				'@type': 'OfferCatalog',
				name: 'Repairing',
				itemListElement: [
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Stone or part replacement or attachment',
						},
					},
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Molding back to original shape',
						},
					},
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Other repairs',
						},
					},
				],
			},
			{
				'@type': 'OfferCatalog',
				name: 'Polishing',
				itemListElement: [
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Gold polish',
						},
					},
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Silver polish',
						},
					},
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Rhodium plating',
						},
					},
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Other polishes',
						},
					},
				],
			},
		],
	},
}

const Service = () => (
	<script
		type="application/ld+json"
		dangerouslySetInnerHTML={{
			__html: JSON.stringify(dataObject),
		}}
	/>
)

export default Service
