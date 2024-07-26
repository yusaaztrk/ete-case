import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
        justifyContent:"space-between"
    },
    top_container:{
     
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

    bottom_container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },

    button_container:{
        width:150
    }
    
})

export default styles