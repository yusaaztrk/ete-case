  import React from 'react';
  import { render, fireEvent } from '@testing-library/react-native';
  import Detail from '../../../src/screens/detail/Detail';
  import { useCart } from '../../../src/Context/CartContext';

  // Mock useCart hook
  jest.mock('../../../src/Context/CartContext', () => ({
    useCart: jest.fn(),
  }));

  describe('Detail', () => {
    const mockRoute = {
      params: {
        id: '1',
        name: 'Product 1',
        price: 100,
        image: 'https://example.com/product1.jpg',
        description: 'This is a description',
      },
    };

    const mockAddToCart = jest.fn();
    const mockToggleFavorite = jest.fn();
    const mockFavorite = [{ id: '1' }]; // Product is already in favorites

    beforeEach(() => {
      (useCart as jest.Mock).mockReturnValue({
        addToCart: mockAddToCart,
        toggleFavorite: mockToggleFavorite,
        favorite: mockFavorite,
      });
    });

    it('renders correctly', () => {
      const { getByText, getByTestId } = render(
        <Detail route={mockRoute as any} />
      );

      // Check if product details are displayed
      expect(getByText('Product 1')).toBeTruthy();
      expect(getByText('This is a description')).toBeTruthy();
      expect(getByText('100 TL')).toBeTruthy();
      expect(getByTestId('favorite-button')).toBeTruthy();
      expect(getByTestId('add-to-cart-button')).toBeTruthy();
    });

  

    it('handles favorite button press', () => {
      const { getByTestId } = render(
        <Detail route={mockRoute as any} />
      );

      // Ensure favorite-button is found
      const favoriteButton = getByTestId('favorite-button');
      expect(favoriteButton).toBeTruthy();

      fireEvent.press(favoriteButton);

      expect(mockToggleFavorite).toHaveBeenCalledWith({
        id: '1',
        name: 'Product 1',
        price: 100,
        image: 'https://example.com/product1.jpg',
        description: 'This is a description',
      });
      
    });

    it('handles add to cart button press correctly', () => {
      const { getByTestId } = render(
        <Detail route={mockRoute as any} />
      );
  
      // Ensure add-to-cart-button is found
      const addToCartButton = getByTestId("add-to-cart-button")
      expect(addToCartButton).toBeTruthy();
  
      // Press the button
      fireEvent.press(addToCartButton);
  
      // Check if the function was called
      expect(mockAddToCart).toHaveBeenCalled();
  
      // Check if the function was called with the correct arguments
      expect(mockAddToCart).toHaveBeenCalledWith({
        id: '1',
        name: 'Product 1',
        price: 100,
        image: 'https://example.com/product1.jpg',
        description: 'This is a description',
      });
  });


  });
