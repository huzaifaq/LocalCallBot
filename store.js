import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import loggerMiddleware from './middlewares/logger'
import rootReducer from './reducers'

const useDevToolsComposer = () => {
	return (
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && //eslint-disable-line
		process.env.NODE_ENV !== 'production'
	)
}

export default function configureStore(preloadedState) {
	const middlewares = [loggerMiddleware, thunkMiddleware]
	const middlewareEnhancer = applyMiddleware(...middlewares)

	const enhancers = [middlewareEnhancer]

	const composedEnhancers = useDevToolsComposer()
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhancers) //eslint-disable-line
		: compose(...enhancers)

	const store = createStore(rootReducer, preloadedState, composedEnhancers)

	return store
}
