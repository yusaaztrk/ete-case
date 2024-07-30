import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartProvider, useCart } from '../../src/Context/CartContext';
import { Alert } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('CartContext', () => {
  test('should add item to cart', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem = { id: '1', name: 'Product 1', price: 100 };

    act(() => {
      result.current.addToCart(newItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual({ ...newItem, quantity: 1 });
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
  
  test('should remove item from cart', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem = { id: '1', name: 'Product 1', price: 100 };

    act(() => {
      result.current.addToCart(newItem);
    });

    expect(result.current.cart).toHaveLength(1);

    act(() => {
      result.current.removeFromCart('1');
    });

    expect(result.current.cart).toHaveLength(0);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  test('should toggle favorite item', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem = { id: '1', name: 'Product 1', price: 100 };

    act(() => {
      result.current.toggleFavorite(newItem);
    });

    expect(result.current.favorite).toHaveLength(1);
    expect(result.current.favorite[0]).toEqual(newItem);
    expect(AsyncStorage.setItem).toHaveBeenCalled();

    act(() => {
      result.current.toggleFavorite(newItem);
    });

    expect(result.current.favorite).toHaveLength(0);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  test('should increment and decrement item quantity', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem = { id: '1', name: 'Product 1', price: 100 };

    act(() => {
      result.current.addToCart(newItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);

    act(() => {
      result.current.incrementQuantity('1');
    });

    expect(result.current.cart[0].quantity).toBe(2);

    act(() => {
      result.current.decrementQuantity('1');
    });

    expect(result.current.cart[0].quantity).toBe(1);
  });

  test('should get total price', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem1 = { id: '1', name: 'Product 1', price: 100 };
    const newItem2 = { id: '2', name: 'Product 2', price: 200 };

    act(() => {
      result.current.addToCart(newItem1);
      result.current.addToCart(newItem2);
    });

    expect(result.current.getTotalPrice()).toBe(300);
  });

  test('should save cart to AsyncStorage', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
  
    const newItem = { id: '1', name: 'Product 1', price: 100 };
  
    act(() => {
      result.current.addToCart(newItem);
    });
  
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ ...newItem, quantity: 1 }]));
  });

  test('should handle error when saving cart to AsyncStorage', async () => {
    AsyncStorage.setItem.mockImplementation(() => Promise.reject(new Error('Failed to save cart')));

    // Mock console.error to avoid cluttering the test output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result, rerender } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem = { id: '1', name: 'Product 1', price: 100 };

    act(() => {
      result.current.addToCart(newItem); // Update cart state
    });

    // Force the useEffect to run by rerendering
    await act(async () => {
      rerender(); // Ensure useEffect is triggered
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for useEffect to run
    });

    expect(console.error).toHaveBeenCalledWith('Sepet verileri kaydedilirken hata oluştu:', expect.any(Error));
  });

  test('should save favorites to AsyncStorage', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
  
    const newItem = { id: '1', name: 'Product 1', price: 100 };
  
    act(() => {
      result.current.toggleFavorite(newItem);
    });
  
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('favorite', JSON.stringify([newItem]));
  });

  test('should show alert when decrementing quantity to 1 and removing item', async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem = { id: '1', name: 'Product 1', price: 100 };

    act(() => {
      result.current.addToCart(newItem);
    });

    act(() => {
      result.current.decrementQuantity('1');
    });

    // Ensure the Alert is triggered when the quantity is 1
    expect(Alert.alert).toHaveBeenCalledWith(
      "Ürünü silmek istiyor musunuz?",
      "",
      [
        { text: "Hayır", style: "cancel" },
        {
          text: "Evet",
          onPress: expect.any(Function),
        },
      ],
      { cancelable: true }
    );
  });

  test('should add new item to cart with quantity 1', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem = { id: '1', name: 'Product 1', price: 100 };

    act(() => {
      result.current.addToCart(newItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual({ ...newItem, quantity: 1 });
  });

  test('should increment quantity of existing item in cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const newItem = { id: '1', name: 'Product 1', price: 100 };

    act(() => {
      result.current.addToCart(newItem);
    });

    // Add the item again to increment its quantity
    act(() => {
      result.current.addToCart(newItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual({ ...newItem, quantity: 2 });
  });

  test('should add multiple items to cart', () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const item1 = { id: '1', name: 'Product 1', price: 100 };
    const item2 = { id: '2', name: 'Product 2', price: 200 };

    act(() => {
      result.current.addToCart(item1);
      result.current.addToCart(item2);
    });

    expect(result.current.cart).toHaveLength(2);
    expect(result.current.cart[0]).toEqual({ ...item1, quantity: 1 });
    expect(result.current.cart[1]).toEqual({ ...item2, quantity: 1 });
  });

  test('should load cart from AsyncStorage', async () => {
    const mockCart = JSON.stringify([{ id: '1', name: 'Product 1', price: 100, quantity: 1 }]);
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(mockCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Force re-render to complete async operations
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toEqual({ id: '1', name: 'Product 1', price: 100, quantity: 1 });
  });

  test('should handle error when loading cart from AsyncStorage', async () => {
    AsyncStorage.getItem.mockImplementation(() => Promise.reject(new Error('Failed to load cart')));

    // Mock console.error to avoid cluttering the test output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for useEffect to run
    });

    expect(result.current.cart).toEqual([]); // Default state if error occurs
    expect(console.error).toHaveBeenCalledWith('Favori verileri yüklenirken hata oluştu:', expect.any(Error));
  });

  test('should load favorites from AsyncStorage', async () => {
    const mockFavorites = JSON.stringify([{ id: '1', name: 'Product 1', price: 100 }]);
    // Mock'ı ayarla
    AsyncStorage.getItem.mockResolvedValue(mockFavorites);

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    // Wait for the hook to process async operations
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.favorite).toHaveLength(1);
    expect(result.current.favorite[0]).toEqual({ id: '1', name: 'Product 1', price: 100 });
  });
});
