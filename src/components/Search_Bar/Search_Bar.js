import React from "react";
import { TextInput, View } from "react-native";
import styles from "./Search_Bar_style";
import Icon from "react-native-vector-icons/Ionicons";

const Search_Bar = ({ onChangeText, search_input }) => {
    return (
        <View style={styles.container}>
            <Icon testID="search-icon" style={styles.searchIcon} name={"search"} size={25} />
            <TextInput
                testID={search_input} // 'search_input' prop'unu 'testID' olarak kullan
                style={styles.input}
                placeholder="Search"
                onChangeText={onChangeText}  // Arama terimi değiştiğinde çağrılır
            />
        </View>
    );
};

export default Search_Bar;
