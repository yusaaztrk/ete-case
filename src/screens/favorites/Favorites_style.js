import { Button, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },

  
    cartItemContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth:1,
        borderRadius:40,
        borderColor:"#DFDFDF"

    },
    
    cartItemDetails: {
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    cartItemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color:"black"
    },
    cartItemPrice: {
        fontSize: 16,
        color:"#2A59FE",
        fontWeight:"bold"
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#dcdcdc',
        borderRadius: 5,
        width:50,
        height:39,
        alignItems:"center",
        justifyContent:"center"
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 16,
        color:"white",
    },
   
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    totalContainer: {
        padding: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"#2A59FE"
    },
    totalPriceText:{
        fonsize:18,
        fontWeight:"bold",
        color:"black"
    },
    bottom_container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    button_container:{
        width:160
    }
});
