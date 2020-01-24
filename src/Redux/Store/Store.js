import { createStore } from "redux"
import {rootReducer } from '../Reducers/Reducer'

const initializeStore = () => {
  const store = createStore(
    rootReducer, // Initializing root reducer  
  );

  return store;
};

export default initializeStore;