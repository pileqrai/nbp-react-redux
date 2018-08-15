import PropTypes from 'prop-types';
import React from "react";
import './styles.css';

export default class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemoval = this.handleRemoval.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.symbol);
    }

    handleRemoval() {
        this.props.onRemove(this.props.symbol);
    }

    render() {
        return (
            <div className="Favourite">
                <button className="search" onClick={this.handleClick}>
                    {this.props.symbol}
                </button>
                <button className="remove" onClick={this.handleRemoval}>
                    -
                </button>
            </div>
        );
    }
};

Favourite.propTypes = {
    symbol: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
};

Favourite.defaultProps = {
    onClick: () => {
    },
    onRemove: () => {
    },
};