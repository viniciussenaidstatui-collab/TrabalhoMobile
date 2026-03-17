import { useEffect } from "react";
import { ImageBackground, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Splash(){

    const navigation = useNavigation();

    useEffect(()=>{

        const time = setTimeout(()=>{
            navigation.replace('Login');
        },3000);

        return ()=> clearTimeout(time);

    },[]);

    return(
        <ImageBackground 
            source={{uri:'https://wallpapers.com/images/featured/samsung-galaxy-ltwgp25zr4bnvfam.jpg'}} 
            style={style.imgBack}
        >
            <Image 
                source={require('../assets/logo.png')} 
                style={style.imgLogo}
            />
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    imgBack:{
        flex:1, 
        justifyContent:"center",
        alignItems:"center"
    },
    imgLogo:{
        width:400,
        height:200
    }
})