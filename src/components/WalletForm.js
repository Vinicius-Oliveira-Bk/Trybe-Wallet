import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWallet } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  render() {
    const { currencies } = this.props;
    const arrayOfCurrencies = [...currencies];
    console.log(arrayOfCurrencies);
    return (
      <form>
        <div>WalletForm</div>
        <label htmlFor="despesa">
          Valor da despesa:
          <input
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="descricao">
          Descrição da despesa:
          <input
            type="text"
            data-testid="description-input"
          />
        </label>
        <select
          data-testid="currency-input"
        >
          {
            arrayOfCurrencies.map((element) => (
              <option value={ element } key={ element }>{ element }</option>
            ))
          }
        </select>
        <select data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
