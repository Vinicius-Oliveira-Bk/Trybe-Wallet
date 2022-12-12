import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;

    await dispatch(addUser(email));

    history.push('/carteira');
  };

  isButtonDisabled = () => {
    const { email, password } = this.state;
    const number = 6;

    const validatePassword = password.length >= number;
    const validateEmail = validator.isEmail(email);

    return !(validatePassword && validateEmail);
  };

  render() {
    const { email, password } = this.state;
    return (
      <>
        <h2>Login</h2>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
            required
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
            required
          />
        </label>
        <button
          type="submit"
          disabled={ this.isButtonDisabled() }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.object,
}.isRequired;

export default connect()(Login);
