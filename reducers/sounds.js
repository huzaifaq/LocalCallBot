import {
	RECEIVE_SOUNDS,
	REQUEST_SOUNDS,
	FAILED_SOUNDS,
} from '../actions/sounds/ActionTypes'

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
		case REQUEST_SOUNDS:
		case RECEIVE_SOUNDS:
		case FAILED_SOUNDS:
			return getNewState(state, action.payload)
		default:
			return state
	}
}

export default products
