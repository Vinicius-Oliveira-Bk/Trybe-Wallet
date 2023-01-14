import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWallet, requestActualCurrency, modifyItem } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      valueInput: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      currency: 'USD',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addExpenses = () => {
    const { dispatch, expenses } = this.props;
    const { id, valueInput, method, tag, description, currency } = this.state;
    dispatch(requestActualCurrency(
      { value: valueInput, currency, method, tag, description, id },
    ));

    this.setState(({
      id: expenses.length + 1,
      valueInput: '',
      description: '',
    }));
  };

  handleEdit = () => {
    const { dispatch } = this.props;
    const { valueInput, method, tag, description, currency } = this.state;
    dispatch(modifyItem(
      { value: valueInput, currency, method, tag, description },
    ));
    this.setState({
      valueInput: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { valueInput, method, tag, description, currency } = this.state;
    const arrayOfCurrencies = [...currencies];
    return (
      <form>
        <div>WalletForm</div>
        <label htmlFor="despesa">
          Valor da despesa:
          <input
            type="number"
            name="valueInput"
            value={ valueInput }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="descricao">
          Descrição da despesa:
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {
            arrayOfCurrencies.map((element) => (
              <option value={ element } key={ element }>{element}</option>
            ))
          }
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <br />

        { !editor && (
          <button
            type="button"
            onClick={ this.addExpenses }
            disabled={ !(/^[0-9]*$/).test(valueInput) }
          >
            Adicionar despesa
          </button>
        )}

        { editor && (
          <button
            type="button"
            onClick={ this.handleEdit }
          >
            Editar despesa
          </button>
        )}
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
