import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Favorite_button from '../../../src/components/Favorite_button'; // Bileşenin doğru yolunu kontrol edin
import Icon from 'react-native-vector-icons/Ionicons';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

describe('Favorite_button', () => {

  
    test('renders gold icon when isFavorite is true', () => {
      const { getByTestId } = render(<Favorite_button isFavorite={true} onPress={() => {}} />);
      const icon = getByTestId('favorite-button').findByType(Icon);
      expect(icon.props.color).toBe('gold');
    });

  test('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Favorite_button isFavorite={false} onPress={onPressMock} />);
    fireEvent.press(getByTestId('favorite-button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  test('renders grey icon when isFavorite is false', () => {
    const { getByTestId } = render(<Favorite_button isFavorite={false} onPress={() => {}} />);
    const icon = getByTestId('favorite-button').findByType(Icon);
    expect(icon.props.color).toBe('#D9D9D9');
  });
});
