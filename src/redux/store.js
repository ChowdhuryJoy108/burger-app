import {createStore,applyMiddleware} from 'redux';
import {reducer} from "./reducer";
import thuk from 'redux-thunk';


export const store = createStore(reducer,applyMiddleware(thuk));