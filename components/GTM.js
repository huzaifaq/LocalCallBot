import { GTMID } from '../helpers/constants'

const GTM = () => (
	<React.Fragment>
		<script
			async
			src="https://www.googletagmanager.com/gtag/js?id=UA-156560018-1"
		/>
		<script
			dangerouslySetInnerHTML={{
				__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GTMID}');
				`,
			}}
		/>
	</React.Fragment>
)

export default GTM
