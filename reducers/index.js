import { combineReducers } from 'redux'

import status from './status'
import categories from './categories'
import sounds from './sounds'

const rootReducer = combineReducers({
	status,
	categories,
	sounds,
})

export default rootReducer
