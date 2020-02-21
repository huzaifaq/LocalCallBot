import Organization from './SEO/Organization'
import LocalBusiness from './SEO/LocalBusiness'
import WebSite from './SEO/WebSite'
import Service from './SEO/Service'

const SEO = () => (
	<React.Fragment>
		<WebSite />
		<LocalBusiness />
		<Service />
		<Organization />
	</React.Fragment>
)

export default SEO
