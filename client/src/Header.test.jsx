import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from './components/Header';
import { expect, test } from 'vitest';

const mockStore = configureStore([]);

test('renders DocCare logo in header', () => {
  const store = mockStore({
    auth: { user: null }
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header toggleSidebar={() => {}} />
      </BrowserRouter>
    </Provider>
  );

  const logoElement = screen.getByText(/DocCare/i);
  expect(logoElement).toBeDefined();
});
