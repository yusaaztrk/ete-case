import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        margin: 5,
        padding: 4,
        backgroundColor: "white",
        width: 160,
        height: 302,
        elevation: 3
    },
    image_container: {
        marginTop: 5,
        position: "relative"
    },
    favorite_button: {
        position: "absolute",
        top: 10, // butonu resmin üst kısmına yerleştirir
        right: 10, // butonu resmin sağ kısmına yerleştirir
        zIndex: 1 // butonun resmin üstünde olmasını sağlar
    },
    image: {
        height: 160,
        width: "90%",
        alignSelf: "center"
    },
    body_container: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        height: 100
    },
    info_container: {
        margin: 6,
        flex: 1,
        justifyContent: "space-between"
    },
    title: {
        color: "black",
        fontSize: 18
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2A59FE"
    }
});
