import {createStore} from 'redux';
import bridges from './Reducers/bridgeReducer';

export default createStore(bridges, {bridges:{}});
