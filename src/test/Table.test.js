import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../tests/helpers/renderWith';
import Table from '../components/Table';

describe('Testando componente <Table />', () => {
  it('Verifica se os elementos da tabela são renderizandos na tela', () => {
    renderWithRedux(<Table />);
    const description = screen.getByText('Descrição');
    const tag = screen.getByText('Tag');
    const payment = screen.getByText('Método de pagamento');
    const valor = screen.getByText('Valor');
    const cambio = screen.getByText('Câmbio utilizado');
    const valorToConvert = screen.getByText('Valor convertido');
    const currency = screen.getByText('Moeda de conversão');
    const edit = screen.getByText('Editar/Excluir');

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(payment).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(cambio).toBeInTheDocument();
    expect(valorToConvert).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(edit).toBeInTheDocument();
  });
});
