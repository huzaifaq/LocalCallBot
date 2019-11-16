import {
	RECEIVE_PRODUCTS,
	REQUEST_PRODUCTS,
	FAILED_PRODUCTS,
} from '../actions/products/ActionTypes'

const initialState = {
	data: [],
	isFetching: false,
	isError: false,
}

export const getNewState = (currentState, payload) => ({
	...currentState,
	...payload,
})

const products = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_PRODUCTS:
		case RECEIVE_PRODUCTS:
		case FAILED_PRODUCTS:
			return getNewState(state, action.payload)
		default:
			return state
	}
}

export default products
