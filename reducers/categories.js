import {
	RECEIVE_CATEGORIES,
	REQUEST_CATEGORIES,
	FAILED_CATEGORIES,
} from '../actions/categories/ActionTypes'

const initialState = {
	categories: [],
	isFetching: false,
	isError: false,
}

export const getNewState = (currentState, payload) => ({
	...currentState,
	...payload,
})

const categories = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_CATEGORIES:
		case RECEIVE_CATEGORIES:
		case FAILED_CATEGORIES:
			return getNewState(state, action.payload)
		default:
			return state
	}
}

export default categories
