import { combineReducers } from 'redux'

import status from './status'
import categories from './categories'
import sounds from './sounds'
import numbers from './numbers'

const rootReducer = combineReducers({
	status,
	categories,
	sounds,
	numbers,
})

export default rootReducer
