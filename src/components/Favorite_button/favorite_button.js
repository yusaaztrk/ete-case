import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Favorite_button = ({ isFavorite, onPress }) => {
  return (
    <View>
      <TouchableOpacity testID="favorite-button" onPress={onPress
        
      }>
        <Icon 
          name={isFavorite ? 'star' : 'star'} 
          size={30} 
          color={isFavorite ? 'gold' : '#D9D9D9'} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default Favorite_button;
