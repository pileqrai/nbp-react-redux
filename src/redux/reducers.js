import {DATA_LOADED, TOGGLE_FAVOURITE, SEARCH_CURRENCY_RATE, SET_ERROR, REMOVE_ALL_FAVOURITES} from './actions';

export const initialState = {
    favourites: JSON.parse(localStorage.getItem('favourites')) || [],
    rates: JSON.parse(localStorage.getItem('rates')) || [],
    isLoading: false,
    error: null,
};

export default function currenciesReducer(state = initialState, action) {
    const newState = {...state};

    switch (action.type) {
        case DATA_LOADED:
            newState.isLoading = false;
            const rateIndex = newState.rates.findIndex(([symbol]) => symbol === action.data.code);
            if (rateIndex > -1) {
                newState.rates.splice(rateIndex, 1);
            }
            newState.rates.unshift([action.data.code, action.data.rates[0]]);
            localStorage.setItem('rates', JSON.stringify(newState.rates));
            return newState;
        case REMOVE_ALL_FAVOURITES:
            newState.favourites = [];
            localStorage.setItem('favourites', JSON.stringify(newState.favourites));
            return newState;
        case SEARCH_CURRENCY_RATE:
            newState.error = null;
            newState.isLoading = true;
            return newState;
        case SET_ERROR:
            newState.isLoading = false;
            newState.error = action.error;
            return newState;
        case TOGGLE_FAVOURITE:
            const symbolIndex = state.favourites.indexOf(action.currencySymbol);
            if (symbolIndex !== -1) {
                newState.favourites.splice(symbolIndex, 1);
            } else {
                newState.favourites.push(action.currencySymbol);
            }
            newState.favourites = [...newState.favourites];
            localStorage.setItem('favourites', JSON.stringify(newState.favourites));
            return newState;
        default:
            return newState;
    }
};