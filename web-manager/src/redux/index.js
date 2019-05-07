import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from './reducers/index'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['userData']
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)

