import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Favorites from '../../../src/screens/favorites/Favorites';
import { useCart } from '../../../src/Context/CartContext';
import '@testing-library/jest-native/extend-expect';

// Mock useCart hook
jest.mock('../../../src/Context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('Favorites', () => {
  const mockToggleFavorite = jest.fn();
  const mockFavorites = [
    { id: '1', name: 'Favorite Item 1', price: 100 },
    { id: '2', name: 'Favorite Item 2', price: 200 },
  ];

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      favorite: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });
  });

  it('renders correctly and displays favorite items', () => {
    const { getByText, getAllByTestId } = render(<Favorites />);

    // Check if items are displayed
    expect(getByText('Favorite Item 1')).toBeTruthy();
    expect(getByText('100 TL')).toBeTruthy();
    expect(getByText('Favorite Item 2')).toBeTruthy();
    expect(getByText('200 TL')).toBeTruthy();

    // Check if empty list message is not shown
    expect(() => getByText('Your favorites is empty')).toThrow();

    // Check if FlatList is rendered
    const flatList = getAllByTestId('flatlist');
    expect(flatList.length).toBeGreaterThan(0);
  });
  it('displays empty message when no favorites', () => {
    (useCart as jest.Mock).mockReturnValue({
      favorite: [],
      toggleFavorite: mockToggleFavorite,
    });

    const { getByText } = render(<Favorites />);

    // Check if empty list message is displayed
    expect(getByText('Your favorites is empty')).toBeTruthy();
  });

  it('calls toggleFavorite when an item is pressed', () => {
    const { getAllByTestId } = render(<Favorites />);

    // Assuming there are multiple star icons, use getAllByTestId
    const starIcons = getAllByTestId('star-icon'); // Use testID or role to identify

    // Press the first star icon
    fireEvent.press(starIcons[0]); 

    // Check if toggleFavorite is called with correct item
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockFavorites[0]);
  });
});
