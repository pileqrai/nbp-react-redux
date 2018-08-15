import axios from "axios/index";

export const DATA_LOADED = 'DATA_LOADED';
export const REMOVE_ALL_FAVOURITES = 'REMOVE_ALL_FAVOURITES';
export const SEARCH_CURRENCY_RATE = 'SEARCH_CURRENCY_RATE';
export const SET_ERROR = 'SET_ERROR';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

const API_URL = 'http://api.nbp.pl/api/exchangerates/rates';
const ERROR_MESSAGES = {
    '404': 'Currency symbol not found',
    '500': 'NBP server error',
};

export const dataLoaded = (data) => ({
    type: DATA_LOADED,
    data,
});

export const searchCurrencyRate = (currencySymbol) => dispatch => {
    dispatch({
        type: SEARCH_CURRENCY_RATE,
        currencySymbol,
    });

    return axios.get(`${API_URL}/A/${currencySymbol}?format=json`).then((result) => {
        dispatch(dataLoaded(result.data));
    }).catch(error => {
        // due to lack of CORS headers in some of 404 responses I had to handle it in following way, because in such case error.response is undefined
        dispatch(setError(error.response ? ERROR_MESSAGES[error.response.status] || 'Unknown error' : error.message));
    });
};

export const toggleFavourite = (currencySymbol) => ({
    type: TOGGLE_FAVOURITE,
    currencySymbol,
});

export const setError = (error = null) => ({
    type: SET_ERROR,
    error,
});

export const removeAllFavourites = () => ({
    type: REMOVE_ALL_FAVOURITES,
});