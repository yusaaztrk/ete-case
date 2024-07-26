import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../../../src/components/ProductCard';


describe('ProductCard', () => {
    const product = {
        id: 1,
        name: 'Test Product',
        price: '299.99',
        image: 'https://via.placeholder.com/150',
    };

    const [productCardTry,SetProductCardTry] = useState(1)
    
    const onSelectTest = () => {
        SetProductCardTry(2)
    };

    test("product card",()=>{
        render(<ProductCard onSelect={onSelectTest} product={product.name} ></ProductCard>)
        expect (productCardTry).toBe(2);
    })
});
