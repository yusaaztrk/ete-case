import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './Detail_style';
import Card_button from '../../components/Card_button';
import { useCart } from '../../Context/CartContext';
import Favorite_button from '../../components/Favorite_button';

const Detail = ({ route }) => {
    const { id, name, price, image, description } = route.params;
    const { addToCart, favorite, toggleFavorite } = useCart();

    const handleAddToCart = () => {
        const product = { id, name, price, image, description };
        addToCart(product);
    };

    const handleToggleFavorite = () => {
        const product = { id, name, price, image, description };
        toggleFavorite(product);
    };

    const isFavorite = favorite.some(favoriteItem => favoriteItem.id === id);

    return (
        <View style={styles.container}>
            <View style={styles.top_container}>
                <View style={styles.image_container}>
                    <Image source={{ uri: image }} style={{ width: "100%", height: 250 }} />
                    <View style={styles.favorite_button}>
                        <Favorite_button isFavorite={isFavorite} onPress={handleToggleFavorite} />
                    </View>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>{name}</Text>
                <Text style={{ color: "black" }}>{description}</Text>
            </View>
            <View style={styles.bottom_container}>
                <View style={styles.price_container}>
                    <Text style={{ color: "#2A59FE", fontSize: 20 }}>Price:</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>{price} TL</Text>
                </View>
                <TouchableOpacity style={styles.button_container}>
                    <Card_button addCart={handleAddToCart} name={"Add To Cart"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Detail;
