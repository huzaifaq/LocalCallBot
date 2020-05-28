import {
	RECEIVE_STATUS,
	REQUEST_STATUS,
	FAILED_STATUS,
} from '../actions/status/ActionTypes'

const initialState = {
	data: [],
	isFetching: false,
	isError: false,
	isSuccess: false,
}

export const getNewState = (currentState, payload) => ({
	...currentState,
	...payload,
})

const products = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_STATUS:
		case RECEIVE_STATUS:
		case FAILED_STATUS:
			return getNewState(state, action.payload)
		default:
			return state
	}
}

export default products
