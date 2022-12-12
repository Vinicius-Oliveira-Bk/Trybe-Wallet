import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
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
            currencies
          }
        </select>
        <select data-testid="method-input">
          <option value="">--Escolha o metodo de pagamento--</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
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
