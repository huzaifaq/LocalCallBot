import fetch from 'isomorphic-unfetch'
import getBaseUrl from '../../API/Basic'
import {
	requestSounds,
	receiveSounds,
	failedSounds,
	requestSoundPlay,
	receiveSoundPlay,
	failedSoundPlay,
} from './Actions'

export const fetchSounds = (category = '') => async dispatch => {
	try {
		dispatch(requestSounds())
		const res = await fetch(
			`https://cms.huzaifa.info/api/sounds${
				category ? `?category=${category}` : ''
			}`
		)
		if (res.status === 200) {
			const data = await res.json()
			dispatch(receiveSounds(data))
			return
		}
		throw res
	} catch (error) {
		console.log('Error: Failed to fetch Sounds')
		dispatch(failedSounds())
	}
}

export const playSound = (assetLink = '') => async dispatch => {
	try {
		dispatch(requestSoundPlay())
		const res = await fetch(
			`${getBaseUrl()}api/playSound${
				assetLink ? `?assetLink=${encodeURIComponent(assetLink)}` : ''
			}`
		)
		if (res.status === 200) {
			const data = await res.json()
			dispatch(receiveSoundPlay(data))
			return
		}
		throw res
	} catch (error) {
		console.log('Error: Failed to play sound')
		dispatch(failedSoundPlay())
	}
}

export default null
