import * as React from "react/cjs/react.development";
import PropTypes from 'prop-types';
import './styles.css';

export default class SearchField extends React.Component {
    constructor(props) {
        super(props);

        this.currencyInputChangeHandler = this.currencyInputChangeHandler.bind(this);
        this.searchButtonClickHandler = this.searchButtonClickHandler.bind(this);
        this.currencyInputKeyPressHandler = this.currencyInputKeyPressHandler.bind(this);

        this.state = {
            value: '',
        }
    }

    currencyInputKeyPressHandler(e) {
        if (e.key === 'Enter' && this.state.value && !this.props.isDisabled) {
            this.searchButtonClickHandler();
        }
    }

    currencyInputChangeHandler(e) {
        const value = e.target.value;

        this.setState({
            value,
        });
    }

    searchButtonClickHandler() {
        // this could be done with some redux side effects library like saga
        this.props.onSearchSubmit(this.state.value).then(() => {
            this.setState({
                value: '',
            })
        });
    }

    render() {
        return (
            <div className="SearchField">
                <input type="text"
                       placeholder='Please type currency symbol (EUR, USD, etc.)'
                       onChange={this.currencyInputChangeHandler}
                       onKeyPress={this.currencyInputKeyPressHandler}
                       value={this.state.value}
                />
                <button disabled={!this.state.value || this.props.isDisabled}
                        onClick={this.searchButtonClickHandler}>Search
                </button>
            </div>
        )
    }
}

SearchField.propTypes = {
    onSearchSubmit: PropTypes.func,
    isDisabled: PropTypes.bool,
};

SearchField.defaultProps = {
    onSearchSubmit: () => {
    },
    isDisabled: false,
};