import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Dimensions } from 'react-native';
import { RadioGroup } from 'react-native-radio-buttons-group';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "white",
        flex:1
    },

    button_container: {
        width: Dimensions.get("window").width * 0.9,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    button_container_text: {
        fontSize: 20,
        color: "black"
    },
    button_container_button: {
        backgroundColor: "#D9D9D9",
        height: 36,
        justifyContent: "center",
        paddingHorizontal: 15,
        width: 158,
        alignItems: "center"
    },
    header: {
        flexDirection: "row",
        width: Dimensions.get("window").width,
        height: 70,
        alignItems: "center",
        paddingHorizontal: 10,
    },
    close_button: {
        position: "absolute",
        left: 15,
    },
    header_title_container: {
        flex:1,
        alignItems: "center"
    },
    modal_text: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
    },

    header_container:{

    },
    sort_container:{
        height:Dimensions.get("screen").height/4,
        
    },
    brand_container:{

        height:Dimensions.get("screen").height/4
    },
    model_container:{
        height:Dimensions.get("screen").height/4
    },
    primary_button_container:{
        marginLeft:"5%",
        marginRight:"5%",
        backgroundColor:"#2A59FE",
        height:40,
        alignItems:"center",
        justifyContent:"center"
    },

    primary_button:{
        fontSize:25,
        alignSelf:"center",
        color:"white",
        fontWeight:"bold",
        backgroundColor:"#2A59FE",
        width:"90%",
        textAlign:"center",
        borderRadius:10,
        height:40
    },
    radio_select:{
        height:Dimensions.get("screen").height/4.5,
        marginLeft:"10%",
        marginRight:"10%",
        marginTop:10
    },

    product_container:{
        width:Dimensions.get("window").width*0.9,
        flex:1,
        marginTop:10,
        
    },
    select_container_in:{
        marginLeft:"5%",
        marginRight:"5%",
        marginTop:5,
    },
    sortBy_container:{
        alignItems:"flex-start",
        marginTop:5,
    },
    sortBy_container: {
        alignItems: "flex-start",
        marginTop: 5,
    },

    radioGroup: {
        borderColor: "blue",
    },

    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000', // Border rengi
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    radioButtonSelected: {
        borderColor: 'blue',
    },

    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'blue', // İç kısmın rengi
    },

    brand_FlatList:{
        width:"100%",
        height:"60%",
        
    },

    checkBox_container:{
        flexDirection:"row",
        alignItems:"center"
    },

    apply_button:{
    }
});

export default styles;
