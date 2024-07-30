import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import Home, { sortAndFilterProducts } from '../../../src/screens/home/Home';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home Screen', () => {
    const mockNavigation = { navigate: jest.fn() };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches and renders products on initial load', async () => {
        const mockProducts = [
            { id: '1', name: 'Product 1', price: 100, image: 'image_url', description: 'Description 1', brand: 'Brand A', model: 'Model X', createdAt: '2024-01-01' },
            { id: '2', name: 'Product 2', price: 200, image: 'image_url', description: 'Description 2', brand: 'Brand B', model: 'Model Y', createdAt: '2024-02-01' },
        ];
        
        mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });
    
        const { findByText } = render(<Home navigation={mockNavigation} />);
        
        await waitFor(() => {
            expect(findByText('Product 1')).toBeTruthy();
            expect(findByText('Product 2')).toBeTruthy();
        });
    });

    it('opens and closes modal', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        const { getByText, queryByText, getByTestId } = render(<Home navigation={mockNavigation} />);

        // Open Modal
        fireEvent.press(getByText('Select Filter'));
        await waitFor(() => {
            expect(getByText('Filter')).toBeTruthy();
        });

        // Close Modal
        const closeIcon = getByTestId('close-icon');
        fireEvent.press(closeIcon);

        // Check if the modal is not visible
        await waitFor(() => {
            expect(queryByText('Filter')).toBeNull();
        });
    });

    const products = [
        { id: '1', name: 'Product A', price: 100, brand: 'Brand X', model: 'Model Y', createdAt: '2021-07-01T00:00:00Z' },
        { id: '2', name: 'Product B', price: 200, brand: 'Brand Y', model: 'Model Z', createdAt: '2021-06-01T00:00:00Z' },
        { id: '3', name: 'Product C', price: 150, brand: 'Brand X', model: 'Model Y', createdAt: '2021-05-01T00:00:00Z' },
    ];

    it('should filter products by search term', () => {
        const filteredProducts = sortAndFilterProducts(products, 'Product A', null, {}, {}, '');
        expect(filteredProducts).toEqual([products[0]]);
    });

    it('should sort products by latest', () => {
        render(<Home navigation={mockNavigation} />);
        const filteredProducts = sortAndFilterProducts(products, '', '1', {}, {}, '');
        expect(filteredProducts).toEqual([products[0], products[1], products[2]]);
    });

    it('should sort products by oldest', () => {
        render(<Home navigation={mockNavigation} />);
        const filteredProducts = sortAndFilterProducts(products, '', '2', {}, {}, '');
        expect(filteredProducts).toEqual([products[2], products[1], products[0]]);
    });

    it('should sort products by price ascending', () => {
        render(<Home navigation={mockNavigation} />);
        const filteredProducts = sortAndFilterProducts(products, '', '3', {}, {}, '');
        expect(filteredProducts).toEqual([products[0], products[2], products[1]]);
    });

    it('should sort products by price descending', () => {
        render(<Home navigation={mockNavigation} />);
        const filteredProducts = sortAndFilterProducts(products, '', '4', {}, {}, '');
        expect(filteredProducts).toEqual([products[1], products[2], products[0]]);
    });

    it('should filter products by brand', () => {
        const selectedBrands = { 'Brand X': true };
        const filteredProducts = sortAndFilterProducts(products, '', null, selectedBrands, {}, '');
        expect(filteredProducts).toEqual([products[0], products[2]]);
        render(<Home navigation={mockNavigation} />);
    });

    it('should filter products by model', () => {
        render(<Home navigation={mockNavigation} />);
        const selectedModels = { 'Model Y': true };
        const filteredProducts = sortAndFilterProducts(products, '', null, {}, selectedModels, '');
        expect(filteredProducts).toEqual([products[0], products[2]]);
    });

    it('should filter products by model search term', () => {
        render(<Home navigation={mockNavigation} />);
        const filteredProducts = sortAndFilterProducts(products, '', null, {}, {}, 'Model Z');
        expect(filteredProducts).toEqual([products[1]]);
    });



});
