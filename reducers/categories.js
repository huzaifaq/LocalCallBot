import {
	RECEIVE_CATEGORIES,
	REQUEST_CATEGORIES,
	FAILED_CATEGORIES,
} from '../actions/categories/ActionTypes'

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
		case REQUEST_CATEGORIES:
		case RECEIVE_CATEGORIES:
		case FAILED_CATEGORIES:
			return getNewState(state, action.payload)
		default:
			return state
	}
}

export default products
