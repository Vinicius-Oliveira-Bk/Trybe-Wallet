import React, { Component } from 'react';

export default class Login extends Component {
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

  render() {
    const { email, password } = this.state;
    return (
      <>
        <div>Login</div>
        <label htmlFor="emial">
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
      </>
    );
  }
}
