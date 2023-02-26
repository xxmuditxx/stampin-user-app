import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import authReducer from './reducers';

const RootReducers = combineReducers({
    authReducer,
});

const store = createStore(RootReducers, applyMiddleware(thunk));

export default store;
