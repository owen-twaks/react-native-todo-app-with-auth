import React, { useState } from "react";
import { Alert,StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import TextInputComponent from "../components/TextInputComponent";
import { loginUser } from "../api";
import { getStore, setStore } from "../utils";

export default function Login({ setLoginScreen, setIsLoggedIn }) {
    const [user, setUser] = useState({
        email:"",
        password:""
    })

    const changeHandler = (name, value) => {
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));        
    };

    const submitHandler = async () => {  
        const callLoginApi = await loginUser(user);
        
        if(callLoginApi.status === 200 && callLoginApi.data.email !== null){
            console.log({ 'Success message': callLoginApi, user: callLoginApi.data });
            setStore('user', callLoginApi.data);
            setUser({});
            getStore('user');
            setIsLoggedIn(true);
        }else{
         
            //props: title, text, array of buttons
            Alert.alert("Oops!", "Invalid email or password", [
                {
                    text: "Try Again",
                    onPress: () => console.log("alert closed"),
                },
            ]);
          
        }
    }

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header title="Login"/>
                <View style={styles.content}>
                    <TextInputComponent
                        style={styles.input}
                        name="email"
                        placeholder="email"
                        onChangeText={changeHandler}
                    />
                    <TextInputComponent
                        style={styles.input}
                        name="password"
                        placeholder="password"
                        onChangeText={changeHandler}
                    />
                    <Button
                        onPress={() => submitHandler()}
                        title={"login"}
                        color="#26a69a"
                    />
                    <TouchableOpacity onPress={() => setLoginScreen(false)}>
                        <Text style={styles.linkText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        padding: 40,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    linkText: {
        textAlign: 'center',
        color:'green',
        paddingTop: 8,
        textDecorationLine: 'underline'
    }
});
