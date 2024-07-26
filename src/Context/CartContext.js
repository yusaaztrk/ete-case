import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const savedFavorites = await AsyncStorage.getItem('favorite');
                if (savedFavorites) {
                    setFavorite(JSON.parse(savedFavorites));
                }
            } catch (error) {
                console.error('Favori verileri yüklenirken hata oluştu:', error);
            }
        };

        loadFavorites();
    }, []);


    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem('cart');
                if (savedCart) {
                    setCart(JSON.parse(savedCart));
                }
            } catch (error) {
                console.error('Favori verileri yüklenirken hata oluştu:', error);
            }
        };

        loadCart();
    }, []);

    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
            } catch (error) {
                console.error('Sepet verileri kaydedilirken hata oluştu:', error);
            }
        };

        saveCart();
    }, [cart]);

    useEffect(() => {
        const saveFavorite = async () => {
            try {
                await AsyncStorage.setItem('favorite', JSON.stringify(favorite));
            } catch (error) {
                console.error('Favori verileri kaydedilirken hata oluştu:', error);
            }
        };

        saveFavorite();
    }, [favorite]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    };

    const toggleFavorite = (item) => {
        setFavorite((prevFavorite) => {
            const existingItem = prevFavorite.find(favoriteItem => favoriteItem.id === item.id);
            if (existingItem) {
                return prevFavorite.filter(favoriteItem => favoriteItem.id !== item.id);
            } else {
                return [...prevFavorite, item];
            }
        });
    };

    const incrementQuantity = (itemId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (itemId) => {
        setCart((prevCart) => {
            const item = prevCart.find(item => item.id === itemId);
            if (item.quantity === 1) {
                Alert.alert(
                    "Ürünü silmek istiyor musunuz?",
                    "",
                    [
                        { text: "Hayır", style: "cancel" },
                        {
                            text: "Evet",
                            onPress: () => removeFromCart(itemId),
                        },
                    ],
                    { cancelable: true }
                );
                return prevCart;
            } else {
                return prevCart.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, favorite, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getTotalPrice, toggleFavorite }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
