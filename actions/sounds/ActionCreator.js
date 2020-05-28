import fetch from 'isomorphic-unfetch'
import getBaseUrl from '../../API/Basic'
import { requestSounds, receiveSounds, failedSounds } from './Actions'

export const fetchSounds = buttonIdentifier => async dispatch => {
	try {
		dispatch(requestSounds())
		const res = await fetch(`${getBaseUrl()}api/sounds?${buttonIdentifier}`)
		if (res.status === 200) {
			const data = await res.json()
			dispatch(receiveSounds(data))
			return
		}
		throw res
	} catch (error) {
		console.log('Error: Failed to fetch Sounds')
		console.error(error)
		dispatch(failedSounds())
	}
}

export default null
