import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../tests/helpers/renderWith';
import Header from '../components/Header';

describe('Testando componente <Header />', () => {
  it('Verifica se o elemento <h3 /> é renderizando com o e-mail do usuário', () => {
    const initialState = {
      email: '',
      totalValue: 0,
    };
    renderWithRedux(<Header />, initialState);
    const userEmail = screen.getByRole('heading', {
      level: 3,
    });

    expect(userEmail).toBeInTheDocument();
  });

  it('Verifica se o elemento que renderiza o valor da despesa é mostrado na tela', () => {
    const initialState = {
      email: 'teste@teste.com',
      totalValue: 0,
    };
    renderWithRedux(<Header />, initialState);
    const totalFiedl = screen.getByText('0');

    expect(totalFiedl).toBeInTheDocument();
  });

  it('Verifica se o elemento que renderiza a moeda padrão é mostrado na tela', () => {
    const initialState = {
      email: '',
      totalValue: 0,
    };
    renderWithRedux(<Header />, initialState);
    const currency = screen.getByText('BRL');

    expect(currency).toBeInTheDocument();
  });
});
