import {
	RECEIVE_NUMBERS,
	REQUEST_NUMBERS,
	FAILED_NUMBERS,
	ACTIVE_CALL_NAME,
} from '../actions/placeCall/ActionTypes'

const initialState = {
	data: [],
	isFetching: false,
	isError: false,
	isSuccess: false,
	activeNumber: '',
}

export const getNewState = (currentState, payload) => ({
	...currentState,
	...payload,
})

const numbers = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_NUMBERS:
		case RECEIVE_NUMBERS:
		case FAILED_NUMBERS:
		case ACTIVE_CALL_NAME:
			return getNewState(state, action.payload)
		default:
			return state
	}
}

export default numbers
