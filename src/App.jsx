import React, {Component} from 'react';
import SearchField from "./SearchField";
import {removeAllFavourites, searchCurrencyRate, toggleFavourite} from "./redux/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import CurrencyRate from "./CurrencyRate";
import Favourite from "./Favourite";
import './styles.css';

class App extends Component {
    render() {
        const results = this.props.rates.reverse().map(([symbol, value], index) => (
            <CurrencyRate key={index}
                          symbol={symbol}
                          rate={value.mid}
                          date={value.effectiveDate}
                          isFavourite={this.props.favourites.indexOf(symbol) !== -1}
                          onToggleFavourite={this.props.onToggleFavourite}
            />
        ));

        const favourites = this.props.favourites.map(symbol => (
            <Favourite key={symbol}
                       symbol={symbol}
                       onClick={this.props.onSearch}
                       onRemove={this.props.onToggleFavourite}
            />
        ));

        return (
            <div className="App">
                <header>
                    <h1>NBP currency checker</h1>
                </header>
                <div className="content-wrapper">
                    <SearchField onSearchSubmit={this.props.onSearch}
                                 isDisabled={this.props.isLoading}/>
                    {favourites.length > 0 && (
                        <div className="Favourites">
                            {favourites}
                            <button className="remove-favourites" onClick={this.props.onRemoveAllFavourites}> Remove all favourites</button>
                        </div>
                    )}
                    {this.props.error && (
                        <p className="status status-error">{this.props.error}</p>
                    )}
                    {this.props.isLoading && (
                        <p className="status status-info">Loading...</p>
                    )}
                    {results.length > 0 && (
                        <div className="SearchResults">
                            <h3>Your results</h3>
                            {results}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    onSearch: PropTypes.func,
    onToggleFavourite: PropTypes.func,
    onRemoveAllFavourites: PropTypes.func,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    favorites: PropTypes.array,
};

App.defaultProps = {
    isDisabled: false,
    error: null,
    onSearch: () => {
    },
    onToggleFavourite: () => {
    },
    onRemoveAllFavourites: () => {
    },
};

export default connect((state) => ({
    error: state.error,
    isLoading: state.isLoading,
    rates: state.rates,
    favourites: state.favourites,
}), (dispatch) => ({
    onSearch: (currencySymbol) => dispatch(searchCurrencyRate(currencySymbol)),
    onToggleFavourite: (currencySymbol) => dispatch(toggleFavourite(currencySymbol)),
    onRemoveAllFavourites: () => dispatch(removeAllFavourites())
}))(App);