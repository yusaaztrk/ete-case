import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './ProductCard.style';
import Card_button from '../Card_button';
import { useCart } from '../../Context/CartContext';
import Favorite_button from '../Favorite_button';

const ProductCard = ({ product, onSelect }) => {
    const { addToCart, toggleFavorite, favorite } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleToggleFavorite = () => {
        toggleFavorite(product);
    };

    const isFavorite = favorite.some(favoriteItem => favoriteItem.id === product.id);

    return (
        <TouchableWithoutFeedback onPress={onSelect} testID="product-card">
            <View style={styles.container}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={{ uri: product.image }} />
                    <View style={styles.favorite_button}>
                        <Favorite_button isFavorite={isFavorite} onPress={handleToggleFavorite} testID="favorite-button" />
                    </View>
                </View>
                <View style={styles.info_container}>
                    <View>
                        <Text style={styles.price}>{product.price} TL</Text>
                        <Text style={styles.title}>{product.name}</Text>
                    </View>
                    <View>
                        <Card_button addCart={handleAddToCart} name={"Add To Cart"} testID="add-to-cart-button" />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ProductCard;
