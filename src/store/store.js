import { configureStore } from '@reduxjs/toolkit';
import lawyerReducer from '../reducers/lawyerReducer';

const store = configureStore({
  reducer: {
    lawyers: lawyerReducer,
  },
});

export default store;
