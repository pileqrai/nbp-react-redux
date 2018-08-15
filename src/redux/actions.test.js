import moxios from 'moxios';
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import {DATA_LOADED, SEARCH_CURRENCY_RATE, searchCurrencyRate, SET_ERROR} from "./actions";

describe('Actions test', function () {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('Checks if async action dispatches fine', async () => {
        const response = JSON.parse('{"table":"A","currency":"dolar amerykański","code":"USD","rates":[{"no":"157/A/NBP/2018","effectiveDate":"2018-08-14","mid":3.7768}]}');
        const expectedActions = [SEARCH_CURRENCY_RATE, DATA_LOADED];

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: response,
            });
        });

        const store = mockStore({});


        await store.dispatch(searchCurrencyRate('USD')).then(() => {
            expect(store.getActions().map(action => action.type)).toEqual(expectedActions);
        });
    });

    it('Checks if 404 request is handled properly', async () => {
        const expectedActions = [SEARCH_CURRENCY_RATE, SET_ERROR];

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 404,
            });
        });

        const store = mockStore({});


        await store.dispatch(searchCurrencyRate('USD')).then(() => {
            expect(store.getActions().map(action => action.type)).toEqual(expectedActions);
        });
    });
});