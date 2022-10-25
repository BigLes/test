import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

jest.mock('react-router-dom');

describe('<App />', () => {
  test('renders correctly', () => {
    render(<App />);
    const linkElement = screen.getByText(/Users Management/i);
    expect(linkElement).toBeInTheDocument();
  });
});
