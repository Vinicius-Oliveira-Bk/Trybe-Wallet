import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import Login from '../pages/Login';

describe('Testando componente <Login />', () => {
  const USER_EMAIL = 'teste@teste.com';
  const USER_PASSWORD = 'teste12345@';
  const ID_EMAIL = 'email-input';
  const ID_PASSWORD = 'password-input';

  it('A pagina está no caminho correto', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se o elemento <h2 /> é renderizando com o nome da página', () => {
    const initialState = {
      email: '',
      password: '',
    };
    renderWithRedux(<Login />, initialState);
    const login = screen.getByRole('heading', {
      level: 2,
    });

    expect(login).toBeInTheDocument();
  });

  it('Verifica se o campo de email é renderizado na tela', () => {
    const initialState = {
      email: '',
      password: '',
    };
    renderWithRedux(<Login />, initialState);
    const email = screen.getByText(/email/i);

    expect(email).toBeInTheDocument();
  });

  it('Verifica se o campo de senha é renderizado na tela', () => {
    const initialState = {
      email: '',
      password: '',
    };
    renderWithRedux(<Login />, initialState);
    const senha = screen.getByText(/senha/i);

    expect(senha).toBeInTheDocument();
  });

  it('Verifica o input de email', () => {
    renderWithRedux(<Login />);
    const userEmailTest = screen.getByTestId(ID_EMAIL);
    userEvent.type(userEmailTest, USER_EMAIL);

    expect(userEmailTest).toHaveValue(USER_EMAIL);
  });

  it('Verifica o input de senha', () => {
    renderWithRedux(<Login />);
    const userPasswordTest = screen.getByTestId(ID_PASSWORD);
    userEvent.type(userPasswordTest, USER_PASSWORD);

    expect(userPasswordTest).toHaveValue(USER_PASSWORD);
  });

  it('Verifica o botão começa desabilitado', () => {
    renderWithRedux(<Login />);

    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();
  });

  it('Verifica o botão começa desabilitado', () => {
    renderWithRedux(<Login />);

    const email = screen.getByTestId(ID_EMAIL);
    const password = screen.getByTestId(ID_PASSWORD);

    userEvent.type(email, 'email_incorreto');
    userEvent.type(password, 'teste');

    const submit = screen.getByRole('button', { name: /entrar/i });
    expect(submit).toBeDisabled();

    userEvent.type(email, USER_EMAIL);
    userEvent.type(password, USER_PASSWORD);
    expect(submit).not.toBeDisabled();
  });

  it('Verifica se ao realizar o login correto o usuário vai para a Wallet', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(ID_EMAIL);
    const password = screen.getByTestId(ID_PASSWORD);

    userEvent.type(email, USER_EMAIL);
    userEvent.type(password, USER_PASSWORD);

    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(buttonLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
