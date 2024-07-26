import { StyleSheet,Dimensions } from "react-native";

export default StyleSheet.create({
    container:{
        borderRadius:5,
        backgroundColor:"#EFEFEF",
        height: 45,
        padding: 2,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
        
    },
    searchIcon:{
        flex:1,
        marginLeft:10

    },
    input:{
        flex:10,
        fontSize:15,
        marginLeft:4
    }
})