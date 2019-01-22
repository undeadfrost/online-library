import {createStore} from 'redux'
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
export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)

