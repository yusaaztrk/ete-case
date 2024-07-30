// Search_Bar.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Search_Bar from '../../../src/components/Search_Bar';
import '@testing-library/jest-native/extend-expect';

describe('Search_Bar', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<Search_Bar search_input={"input"} onChangeText={() => {}} />
      
      );

        const searchIcon = getByTestId('search-icon');
        const searchInput = getByTestId('input');
        
        expect(searchIcon).toBeTruthy();
        expect(searchInput).toBeTruthy();
    });

    it('calls onChangeText when text is input', () => {
        const mockOnChangeText = jest.fn();
        const { getByTestId } = render(<Search_Bar onChangeText={mockOnChangeText} search_input="search-input" />);
        
        // 'search-input' testID'sine sahip TextInput'u al
        const searchInput = getByTestId('search-input');
        
        // Metin değişikliği tetikle
        fireEvent.changeText(searchInput, 'test');
        
        // mock fonksiyonunun doğru argümanla çağrıldığını doğrula
        expect(mockOnChangeText).toHaveBeenCalledWith('test');
    });
});
