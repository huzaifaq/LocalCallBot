import {
	RECEIVE_SOUNDS,
	REQUEST_SOUNDS,
	FAILED_SOUNDS,
	ACTIVE_SOUND_NAME,
} from '../actions/sounds/ActionTypes'

const initialState = {
	data: [],
	isFetching: false,
	isError: false,
	isSuccess: false,
	activeUrl: '',
}

export const getNewState = (currentState, payload) => ({
	...currentState,
	...payload,
})

const sounds = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_SOUNDS:
		case RECEIVE_SOUNDS:
		case FAILED_SOUNDS:
		case ACTIVE_SOUND_NAME:
			return getNewState(state, action.payload)
		default:
			return state
	}
}

export default sounds
