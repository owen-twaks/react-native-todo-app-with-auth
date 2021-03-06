import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { getStore, setStore } from "./utils";

//screens
import MyTodos from "./screens/MyTodos";
import Login from "./screens/Login";
import Register from "./screens/Register";

async function checkAuth(setIsLoggedIn) {
    const user = await getStore('user');
    if(user !== undefined && user !== null && typeof(user) === 'object' && user.email !== null){
        setIsLoggedIn(true);
    }else{
        setIsLoggedIn(false);
    }
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isloginScreen, setLoginScreen] = useState(true);

    useEffect(() => {
        async function auth() {
            checkAuth(setIsLoggedIn);
        }
        auth()
       
    },[setIsLoggedIn])

    const handleLogout = () => {
        setStore('user', {});
        checkAuth(setIsLoggedIn);
    }

    //Manage Views
    const manageSignInScreens = isloginScreen ? <Login setLoginScreen={setLoginScreen} setIsLoggedIn={setIsLoggedIn}/> : <Register setLoginScreen={setLoginScreen} />
    const manageDefaultScreen = isLoggedIn ? <MyTodos handleLogout={handleLogout}/> : manageSignInScreens;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {manageDefaultScreen}
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});