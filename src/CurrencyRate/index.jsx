import React from "react";
import PropTypes from 'prop-types';
import './styles.css';

export default class CurrencyRate extends React.Component {
    constructor(props) {
        super(props);
        this.toggleFavourite = this.toggleFavourite.bind(this);
    }

    toggleFavourite() {
        this.props.onToggleFavourite(this.props.symbol);
    }

    render() {
        return (
            <div className="CurrencyRate">
                <div className="symbol">{this.props.symbol}</div>
                <div className="rate">{this.props.rate} PLN</div>
                <div className="date">{this.props.date}</div>
                <div className="favourite">
                    <button className="favourite"
                            onClick={this.toggleFavourite}>
                        {this.props.isFavourite ? 'Remove from favourites' : 'Mark as Favourite'}
                    </button>
                </div>
            </div>
        )
    }
};

CurrencyRate.propTypes = {
    symbol: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    isFavourite: PropTypes.bool,
    onToggleFavourite: PropTypes.func,
};

CurrencyRate.defaultProps = {
    isFavourite: false,
    onToggleFavourite: () => {
    }
};