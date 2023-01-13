import React from 'react';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import App from '../App';

describe('Testando componente <App />', () => {
  it('A pagina possui as rotas corretas', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    // expect(pathname).toBe('/carteira');
  });
});
