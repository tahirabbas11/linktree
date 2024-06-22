import { combineReducers } from 'redux';

// import slices
import {mainSliceReducer} from './slices/mainSlice';
import { themeReducer } from './slices/themeSlice';


const rootReducer = combineReducers({
    auth: mainSliceReducer,
    theme: themeReducer,
});

export default rootReducer;