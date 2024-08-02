import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../../../src/components/ProductCard';
import { useCart } from '../../../src/Context/CartContext';

jest.mock('../../../src/Context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Product 1',
    price: 100,
    image: 'https://example.com/product1.jpg',
  };

  const mockOnSelect = jest.fn();
  const mockAddToCart = jest.fn();
  const mockToggleFavorite = jest.fn();
  const mockFavorite = [{ id: '1' }]; 

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
      toggleFavorite: mockToggleFavorite,
      favorite: mockFavorite,
    });
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <ProductCard product={mockProduct} onSelect={mockOnSelect} />
    );

    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('100 TL')).toBeTruthy();
    expect(getByTestId('product-card')).toBeTruthy();
    expect(getByTestId('favorite-button')).toBeTruthy();
  });

 

  it('handles favorite button press', () => {
    const { getByTestId } = render(
      <ProductCard product={mockProduct} onSelect={mockOnSelect} />
    );

    const favoriteButton = getByTestId('favorite-button');
    expect(favoriteButton).toBeTruthy();

    fireEvent.press(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(mockProduct);
  });

  it('handles Cart button press', () => {
    const { getByTestId } = render(
      <ProductCard product={mockProduct} onSelect={mockOnSelect} />
    );

    const addButton = getByTestId('add-to-cart-button');
    expect(addButton).toBeTruthy();

    fireEvent.press(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });




  it('handles product card press', () => {
    const { getByTestId } = render(
      <ProductCard product={mockProduct} onSelect={mockOnSelect} />
    );

    // Ensure product-card is found
    const productCard = getByTestId('product-card');
    expect(productCard).toBeTruthy();

    fireEvent.press(productCard);

    expect(mockOnSelect).toHaveBeenCalled();
  });
});
