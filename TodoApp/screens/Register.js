import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import TextInputComponent from "../components/TextInputComponent";
import { registerUser } from "../api";

export default function Register({ setLoginScreen }) {
    const [user, setUser] = useState({
        firstname:"",
        lastname:"",
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
        const response = await registerUser(user);
        
        if(response.status === 200){
            console.log('Success message',  response.data.message);
            setUser({});
            setLoginScreen(true);
        }    
    }

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header title="Register"/>
                <View style={styles.content}>
                    <TextInputComponent
                        style={styles.input}
                        value={user.firstname}
                        name="firstname"
                        placeholder="first name"
                        onChangeText={changeHandler}
                    />
                    <TextInputComponent
                        style={styles.input}
                        value={user.lastname}
                        name="lastname"
                        placeholder="last name"
                        onChangeText={changeHandler}
                    />
                    <TextInputComponent
                        style={styles.input}
                        value={user.email}
                        name="email"
                        placeholder="email"
                        onChangeText={changeHandler}
                    />
                    <TextInputComponent
                        style={styles.input}
                        value={user.password}
                        name="password"
                        placeholder="password"
                        onChangeText={changeHandler}
                    />
                    <Button
                        onPress={() => submitHandler()}
                        title={"register"}
                        color="#26a69a"
                    />
                    <TouchableOpacity onPress={() => setLoginScreen(true)}>
                        <Text style={styles.linkText}>Login</Text>
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
