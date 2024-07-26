import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../../Context/CartContext';
import styles from './Cart_style';
import Card_button from '../../components/Card_button';

const Cart = () => {
    const { cart, incrementQuantity, decrementQuantity, getTotalPrice } = useCart();

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            <View style={styles.cartItemDetails}>
                <View style={styles.info}>
                    <Text style={styles.cartItemTitle}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>{item.price} TL</Text>
                </View>
                
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <View style={{backgroundColor:"#2A59FE",width:56,height:42,alignItems:"center",justifyContent:"center"}}>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                    </View>
                    <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={renderCartItem}
                keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
            />
            <View style={styles.bottom_container}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPriceText}>{getTotalPrice()} TL</Text>
                </View>
                <View style={styles.button_container}>
                    <Card_button name={"Complete"} />
                </View>
            </View>
        </View>
    );
};

export default Cart;
