import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from '../../Context/CartContext';
import styles from '../favorites/Favorites_style';
import Icon from 'react-native-vector-icons/Ionicons';

const Favorites = () => {
    const { favorite, toggleFavorite } = useCart();

    const handleToggleFavorite = (item) => {
        toggleFavorite(item);
    };

    const renderFavoriteItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            <View style={styles.cartItemDetails}>
                <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
                    <Icon name='star' size={40} color='gold' />
                </TouchableOpacity>
                <Text style={styles.cartItemTitle}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>{item.price} TL</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favorite}
                renderItem={renderFavoriteItem}
                keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Your favorites is empty</Text>}
            />
        </View>
    );
}

export default Favorites;
