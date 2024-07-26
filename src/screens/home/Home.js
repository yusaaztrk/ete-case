import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import Search_Bar from '../../components/Search_Bar';
import styles from './Home_style';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductCard from '../../components/ProductCard';
import { RadioGroup } from 'react-native-radio-buttons-group';
import CheckBox from '@react-native-community/checkbox';

const Home = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState();
    const [selectedBrands, setSelectedBrands] = useState({});
    const [selectedModels, setSelectedModels] = useState({});
    const [brandSearchTerm, setBrandSearchTerm] = useState('');
    const [modelSearchTerm, setModelSearchTerm] = useState('');

    const sortOptions = [
        { id: '1', label: 'New to old', value: 'latest' },
        { id: '2', label: 'Old to new', value: 'oldest' },
        { id: '3', label: 'Price Low to High', value: 'priceAsc' },
        { id: '4', label: 'Price High to Low', value: 'priceDesc' }
    ];

    const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filteredProducts = [...products].filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );


        
        if (Object.keys(selectedBrands).some(key => selectedBrands[key])) {
            filteredProducts = filteredProducts.filter(product => selectedBrands[product.brand]);
        }

        if (modelSearchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.model.toLowerCase().includes(modelSearchTerm.toLowerCase())
            );
        }

        switch (selectedSort) {
            case '1':
                filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case '2':
                filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case '3':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case '4':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
        }

        setFilteredProducts(filteredProducts);
    }, [products, searchTerm, selectedSort, selectedBrands,selectedModels,modelSearchTerm]);

    const handleSortChange = (value) => {
        setSelectedSort(value);
    };

    const handleSearchChange = (text) => {
        setSearchTerm(text);
    };

    const handleBrandSearchChange = (text) => {
        setBrandSearchTerm(text);
    };

    const handleModelSearchChange = (text) => {
        setModelSearchTerm(text);
    };

    const handleProductSelect = (id,name, price, image, description) => {
        navigation.navigate("Detail", { id,name, price, image, description });
    };
    const handleBrandCheckBoxChange = (brand) => {
        setSelectedBrands((prevSelectedBrands) => ({
            ...prevSelectedBrands,
            [brand]: !prevSelectedBrands[brand],
        }));
    };
    
    const handleModelCheckBoxChange = (model) => {
        setSelectedModels((prevSelectedModels) => ({
            ...prevSelectedModels,
            [model]: !prevSelectedModels[model],
        }));
    };
 
    const renderProduct = ({ item }) => (
        <ProductCard
            product={item}
            onSelect={() => handleProductSelect( item.id, item.name, item.price, item.image, item.description)}
            navigation={navigation}
        />
    );

    /*const renderBrandItem = ({ item }) => (
        <View>
            <View style={styles.checkBox_container}>
                <CheckBox
                    value={selectedBrands[item.brand] || false}
                    onValueChange={() => handleBrandCheckBoxChange(item.brand)}
                />
                <Text style={styles.itemText}>{item.brand}</Text>
            </View>
        </View>
    );

    const renderModelItem = ({item}) =>(
        <View>
            <View style={styles.checkBox_container}>
                <CheckBox
                    value={selectedModels[item.model] || false}
                    onValueChange={() => handleModelCheckBoxChange(item.model)}
                />
                <Text style={styles.itemText}>{item.model}</Text>
            </View>
        </View>
    )*/

    const offBtn = () =>{
        setModalVisible(!modalVisible)
        setBrandSearchTerm("")
        setModelSearchTerm("")

    }


    const uniqueBrands = Array.from(new Set(products.map(product => product.brand)));
    const uniqueModels = Array.from(new Set(products.map(product => product.model)));


    const applyFilters = () => {
        let filteredProducts = [...products].filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (Object.keys(selectedBrands).some(key => selectedBrands[key])) {
            filteredProducts = filteredProducts.filter(product => selectedBrands[product.brand]);
        }

        if (Object.keys(selectedModels).some(key => selectedModels[key])) {
            filteredProducts = filteredProducts.filter(product => selectedModels[product.model]);
        }

        switch (selectedSort) {
            case '1':
                filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case '2':
                filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case '3':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case '4':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
        }

        setFilteredProducts(filteredProducts);
        setModalVisible(!modalVisible);
    };

    
    return (
        <View style={styles.container}>
            <View style={{ width: Dimensions.get('window').width * 0.9, marginTop: 10 }}>
                <Search_Bar onChangeText={handleSearchChange} />
            </View>
            <View style={styles.button_container}>
                <Text style={styles.button_container_text}>Filters: </Text>
                <TouchableOpacity style={styles.button_container_button} onPress={() => setModalVisible(true)}>
                    <Text style={{ color: 'black' }}>Select Filter</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.product_container}>
                <FlatList
                    data={filteredProducts}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            </View>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.header_container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={(offBtn)} style={styles.close_button}>
                                <Icon style={{ color: 'black' }} name="close" size={35} />
                            </TouchableOpacity>
                            <View style={styles.header_title_container}>
                                <Text style={styles.modal_text}>Filter</Text>
                            </View>
                        </View>
                        <View style={{ width: "100%", height: 5, backgroundColor: "#dcdcdc" }} />
                    </View>

                    <View style={styles.sort_container}>
                        <View style={styles.select_container_in}>
                            <Text>Sort By</Text>
                            <View style={styles.sortBy_container}>
                                <RadioGroup
                                    radioButtons={sortOptions}
                                    onPress={handleSortChange}
                                    selectedId={selectedSort}
                                    style={styles.radioGroup}
                                />
                            </View>
                        </View>
                        <View style={styles.radio_select} />
                    </View>

                    <View style={styles.brand_container}>
                        <View style={{ height: 1, backgroundColor: "grey", width: "90%", alignSelf: "center" }} />
                        <View style={styles.select_container_in}>
                            <Text>Brand</Text>
                        </View>
                        <View style={styles.radio_select}>
                            <Search_Bar onChangeText={handleBrandSearchChange} />
                            <View style={styles.brand_FlatList}>
                            <FlatList
                                data={uniqueBrands.filter(brand => brand.toLowerCase().includes(brandSearchTerm.toLowerCase()))}
                                renderItem={({ item }) => (
                                <View style={styles.checkBox_container}>
                                        <CheckBox
                                        value={selectedBrands[item] || false}
                                        onValueChange={() => handleBrandCheckBoxChange(item)}
                                />
                                <Text style={styles.itemText}>{item}</Text>
                    </View>
                )}
                keyExtractor={(item) => item}
            />
                            </View>
                        </View>
                    </View>

                    <View style={styles.model_container}>
                        <View style={{ height: 1, backgroundColor: "grey", width: "90%", alignSelf: "center" }} />
                        <View style={styles.select_container_in}>
                            <Text>Model</Text>
                        </View>
                        <View style={styles.radio_select}>
                            <Search_Bar onChangeText={handleModelSearchChange} />
                            <View style={styles.brand_FlatList}>
                            <FlatList
                                data={uniqueModels.filter(model => model.toLowerCase().includes(modelSearchTerm.toLowerCase()))}
                                renderItem={({ item }) => (
                                    <View style={styles.checkBox_container}>
                                        <CheckBox
                                            value={selectedModels[item] || false}
                                            onValueChange={() => handleModelCheckBoxChange(item)}
                                        />
                                        <Text style={styles.itemText}>{item}</Text>
                                    </View>
                                )}
                                keyExtractor={(item) => item}
                            />
                            </View>
                        </View>
                        
                    </View>

                        <TouchableOpacity onPress={applyFilters}>
                                <View style={styles.primary_button_container}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>Apply</Text>
                                </View>
                        </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default Home;
