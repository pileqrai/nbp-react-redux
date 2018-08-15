import currenciesReducer from "./reducers";
import {removeAllFavourites, toggleFavourite} from "./actions";

describe('Reducers tests', () => {
    it('should return initial state', () => {
        expect(currenciesReducer(undefined,{})).toEqual(
            {
                favourites: [],
                rates: [],
                isLoading: false,
                error: null,
            }
        );
    });

    it('handles loading', () => {
        let state;
        state = currenciesReducer({favourites:[],rates:[],isLoading:false,error:null}, {type:'SEARCH_CURRENCY_RATE',currencySymbol:'usd'});
        expect(state).toEqual({favourites:[],rates:[],isLoading:true,error:null});
        state = currenciesReducer({favourites:[],rates:[],isLoading:true,error:null}, {type:'DATA_LOADED',data:{table:'A',currency:'dolar amerykański',code:'USD',rates:[{no:'157/A/NBP/2018',effectiveDate:'2018-08-14',mid:3.7768}]}});
        expect(state).toEqual({favourites:[],rates:[['USD',{no:'157/A/NBP/2018',effectiveDate:'2018-08-14',mid:3.7768}]],isLoading:false,error:null});
    });

    it('handles toggling favourite', () => {
        expect(currenciesReducer(undefined, toggleFavourite("USD")).favourites).toEqual(["USD"]);
        expect(currenciesReducer(undefined, toggleFavourite("USD")).favourites).toEqual([]);

    });

    it('handles removal of all facourites', () => {
        expect(currenciesReducer({favourites: ['USD', 'CHF']}, removeAllFavourites()).favourites).toEqual([]);
    });
});