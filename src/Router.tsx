import React from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./screens/home/Home";
import Cart from "./screens/cart/Cart";
import Favorites from "./screens/favorites/Favorites";
import Profile from "./screens/profile/Profile";
import Detail from "./screens/detail/Detail";
import IconIoni from "react-native-vector-icons/Ionicons";
import { CartProvider, useCart } from "./Context/CartContext";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="HomeMain"
                component={Home}
                options={{
                    headerShown: true,
                    title: "E-MARKET",
                    headerStyle: { backgroundColor: "#2A59FE" },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
                }}
            />
            <HomeStack.Screen 
                name="Detail"
                component={Detail}
                options={({ route }) => ({
                    title: route.params?.name || 'Detail', 
                    headerStyle: { backgroundColor: "#2A59FE" },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
                })}
            />
        </HomeStack.Navigator>
    );
}

const CartIconWithBadge = () => {
    const { cart } = useCart();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <View>
            <IconIoni name="basket-outline" size={40} style={{color:"black"}} />
            {(
                <View style={{
                    position: 'absolute',
                    right: -10,
                    top: 0,
                    backgroundColor: 'red',
                    borderRadius: 12,
                    width: 23,
                    height: 23,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor:"#fff",
                    borderWidth:1
                }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{cartItemCount}</Text>
                </View>
            )}
        </View>
    );
};

const TabNavigation = () => {
    return (
        <CartProvider>
            <NavigationContainer>
                <Tab.Navigator screenOptions={{ tabBarStyle: { height: 60 } }}>
                    <Tab.Screen 
                        name="Home" 
                        component={HomeStackScreen}
                        options={{
                            tabBarLabel: '', 
                            tabBarIcon: ({ color, size }) => (<IconIoni name="home-outline" color={color} style={{color:"black"}} size={35} />),
                            headerShown: false,
                        }} 
                    />
                    <Tab.Screen 
                        name="Cart" 
                        component={Cart}
                        options={{
                            tabBarLabel: '', 
                            tabBarIcon: () => <CartIconWithBadge />,
                            title: "E-MARKET", 
                            headerStyle: { backgroundColor: "#2A59FE" },
                            headerTitleStyle: { color: "white", fontWeight: "bold", fontSize: 24 },
                        }} 
                    />
                    <Tab.Screen 
                        name="Favorites" 
                        component={Favorites}
                        options={{
                            tabBarLabel: '', 
                            tabBarIcon: ({ color, size }) => (<IconIoni name="star-outline" color={color} size={35} style={{color:"black"}} />),
                            title: "E-MARKET", 
                            headerStyle: { backgroundColor: "#2A59FE" },
                            headerTitleStyle: { color: "white", fontWeight: "bold", fontSize: 24 },
                        }} 
                    />
                    <Tab.Screen 
                        name="Profile" 
                        component={Profile}
                        options={{
                            tabBarLabel: '', 
                            tabBarIcon: ({ color, size }) => (<IconIoni name="person-outline" color={color} size={33} style={{color:"black"}} />),
                            title: "E-MARKET", 
                            headerStyle: { backgroundColor: "#2A59FE" },
                            headerTitleStyle: { color: "white", fontWeight: "bold", fontSize: 24 },
                        }} 
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
};

export default TabNavigation;
