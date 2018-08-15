import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store';
import {initialState} from "./redux/reducers";
import {Provider} from "react-redux";

describe('Test App component', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={store}><App/></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})
