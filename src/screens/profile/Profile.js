import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import Search_Bar from '../../components/Search_Bar';

const ProductTableScreen = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:3000/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const filterProducts = () => {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const newFilteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(lowercasedSearchTerm) ||
                product.brand.toLowerCase().includes(lowercasedSearchTerm) ||
                product.model.toLowerCase().includes(lowercasedSearchTerm) ||
                product.price.toString().includes(lowercasedSearchTerm)
            );
            setFilteredProducts(newFilteredProducts);
        };  
        filterProducts();
    }, [searchTerm, products]);

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.brand}</Text>
            <Text style={styles.cell}>{item.model}</Text>
            <Text style={styles.cell}>${item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Search_Bar 
                    onChangeText={text => setSearchTerm(text)}
                    search_input={searchTerm}
                />
            </View>
            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <View style={styles.headerRow}>
                        <Text style={styles.headerCell}>Name</Text>
                        <Text style={styles.headerCell}>Brand</Text>
                        <Text style={styles.headerCell}>Model</Text>
                        <Text style={styles.headerCell}>Price</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductTableScreen;
