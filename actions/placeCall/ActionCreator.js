import fetch from 'isomorphic-unfetch'
import { getBaseAPIUrl } from '../../API/Basic'
import {
	requestNumbers,
	receiveNumbers,
	failedNumbers,
	requestPlaceCall,
	receivePlaceCall,
	failedPlaceCall,
} from './Actions'
import { streamToString } from '../../helpers/utils'

// Get list of callable phone numbers
export const fetchPhoneNumbers = () => async dispatch => {
	try {
		dispatch(requestNumbers())
		// const res = await fetch(`${getExternalAPIUrl()}/api/phone-numbers}`)
		const res = await fetch('https://cms.huzaifa.info/api/phone-numbers') // Sadi PLZ fix
		if (res.status === 200) {
			const data = await res.json()
			dispatch(receiveNumbers(data))
			return
		}
		throw res
	} catch (error) {
		console.log('Error: Failed to get phone numbers')
		dispatch(failedNumbers())
	}
}

// Call requested phone numbers
export const placeCall = (phoneNumber = '') => async dispatch => {
	try {
		dispatch(requestPlaceCall())
		const res = await fetch(
			`${getBaseAPIUrl()}/api/placeCall${
				phoneNumber
					? `?phoneNumber=${encodeURIComponent(phoneNumber)}`
					: ''
			}`
		)
		if (res.status === 200) {
			const data = await res.json()
			dispatch(receivePlaceCall(data))
			return
		}
		throw res
	} catch (e) {
		// const result = await streamToString(e.body)
		const result = await streamToString(e.body)

		console.log(`Error: Failed to place call: ${result}`)
		dispatch(failedPlaceCall())
	}
}

export default null
