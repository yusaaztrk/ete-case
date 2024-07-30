import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Cart from '../../../src/screens/cart/Cart';
import { useCart } from '../../../src/Context/CartContext';
import '@testing-library/jest-native/extend-expect';

// Mock useCart hook
jest.mock('../../../src/Context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('Cart', () => {
  const mockIncrementQuantity = jest.fn();
  const mockDecrementQuantity = jest.fn();
  const mockGetTotalPrice = jest.fn().mockReturnValue(400);

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [
        {
          id: '1',
          name: 'Item 1',
          price: '100',
          quantity: 1,
        },
        {
          id: '2',
          name: 'Item 2',
          price: '200',
          quantity: 2,
        },
      ],
      incrementQuantity: mockIncrementQuantity,
      decrementQuantity: mockDecrementQuantity,
      getTotalPrice: mockGetTotalPrice,
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(<Cart />);

    // Check if total price is displayed
    expect(getByText('Total:')).toBeTruthy();
    expect(getByText('400 TL')).toBeTruthy();

    // Check if items are displayed
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('100 TL')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
    expect(getByText('200 TL')).toBeTruthy();
  });

  it('displays empty cart message when cart is empty', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      incrementQuantity: mockIncrementQuantity,
      decrementQuantity: mockDecrementQuantity,
      getTotalPrice: () => 0,
    });

    const { getByText } = render(<Cart />);

    expect(getByText('Your cart is empty')).toBeTruthy();
  });

  it('calls incrementQuantity and decrementQuantity correctly', () => {
    const { getByTestId } = render(<Cart />);
    const incrementButton1 = getByTestId('increment-button-1');
    const decrementButton1 = getByTestId('decrement-button-1');

    fireEvent.press(incrementButton1);
    fireEvent.press(decrementButton1);

    expect(mockIncrementQuantity).toHaveBeenCalledWith('1');
    expect(mockDecrementQuantity).toHaveBeenCalledWith('1');
  });

  it('shows the correct total price', () => {
    const { getByText } = render(<Cart />);
    expect(getByText('400 TL')).toBeTruthy();
  });

  it('renders list items correctly', () => {
    const { getByText, getByTestId } = render(<Cart />);

    // Test if list items render correctly
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('100 TL')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
    expect(getByText('200 TL')).toBeTruthy();

    // Quantity buttons' testIDs
    expect(getByTestId('decrement-button-1')).toBeTruthy();
    expect(getByTestId('increment-button-1')).toBeTruthy();
  });
});
