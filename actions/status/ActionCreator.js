import fetch from 'isomorphic-unfetch'
import getBaseUrl from '../../API/Basic'
import { requestStatus, receiveStatus, failedStatus } from './Actions'

export const fetchStatus = buttonIdentifier => async dispatch => {
	try {
		dispatch(requestStatus())
		const res = await fetch(`${getBaseUrl()}api/status?${buttonIdentifier}`)
		if (res.status === 200) {
			const data = await res.json()
			dispatch(receiveStatus(data))
			return
		}
		throw res
	} catch (error) {
		console.log('Error: Failed to fetch Status')
		console.error(error)
		dispatch(failedStatus())
	}
}

export default null
