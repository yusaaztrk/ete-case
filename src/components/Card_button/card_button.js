import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./card_button_style";

const CartButton = ({ addCart,name }) => {
    return (
        <TouchableOpacity style={styles.cart_button} onPress={addCart}>
            <Text style={{ color: "white", fontSize: 16 }}>{name}</Text>
        </TouchableOpacity>
    );
};

export default CartButton;
