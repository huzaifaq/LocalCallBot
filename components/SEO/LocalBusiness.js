const dataObject = {
	'@context': 'http://schema.org',
	'@type': 'LocalBusiness',
	name: 'Zavtin',
	image: 'https://craftedjewellers.in/images/icons/zavtin-horizontal.png',
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
	url: 'https://craftedjewellers.in/',
}

const LocalBusiness = () => (
	<script
		type="application/ld+json"
		dangerouslySetInnerHTML={{
			__html: JSON.stringify(dataObject),
		}}
	/>
)

export default LocalBusiness
