import React from 'react'
import { Provider } from "react-redux"
import initializeStore from './Redux/Store/Store'
import AppRoute from './Routing'


const InitiateApp = props => {
    const store = initializeStore();
    return (
        <Provider store={store}>
            <AppRoute />
        </Provider>
    );
};

export default InitiateApp