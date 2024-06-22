import { combineReducers } from 'redux';

// import slices
import { mainSliceReducer } from './slices/mainSlice';
import { themeReducer } from './slices/themeSlice';
import { userReducer } from './slices/userSlice';

const rootReducer = combineReducers({
  auth: mainSliceReducer,
  theme: themeReducer,
  user: userReducer,
});

export default rootReducer;
