import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Header from "../components/Header";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import { getTasks, createTask, deleteTask, updateTask } from '../api';

async function callApi(setTodos) {
    setTodos([]);
    const response = await getTasks();
    if(response.status === 200){
      setTodos(response.data);
    }
  }

export default function MyTodos({ handleLogout }) {
    const [todos, setTodos] = useState([]);
    const [updateView, setUpdateView] = useState(false);
    const [currentTask, setCurrentTask] = useState({});

    useEffect(() => {
        callApi(setTodos);
     },[])

    const handleDelete = async (id) => { // TOFIX
        const data = { id: id };
        const callDeleteApi = await deleteTask(data);
        
        if(callDeleteApi.status === 200){
            console.log('Success message',  callDeleteApi.data.message);
            callApi(setTodos);
        }
    };

    const submitHandler = async (text) => {
        //Validate text length is greater than 3
        if (text.length > 3) {
            const data = { name: text }
            const callPostApi = await createTask(data);
            
            if(callPostApi.status === 200){
                console.log('Success message',  callPostApi.data.message);
                callApi(setTodos);
            }    

        } else {
            //props: title, text, array of buttons
            Alert.alert("Oops!", "Todos must be over 3 chars long", [
                {
                    text: "Understood",
                    onPress: () => console.log("alert closed"),
                },
            ]);
        }
    };

    const handleCurrentView = (task) => {
        setCurrentTask(task);
        setUpdateView(true);
    }

    const updateHandler = async (id, newTask) => {
        const data = { id: id, name: newTask }
        const callUpdateApi = await updateTask(data);

        if(callUpdateApi.status === 200){
            console.log('Success message',  callUpdateApi.data.message);
            setUpdateView(false);
            setCurrentTask({});
            callApi(setTodos);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header title="Todo List"/>
                <View style={styles.content}>
                <TouchableOpacity style={styles.signOut} onPress={() => handleLogout()}>
                    <MaterialIcons name="logout" size={18} color="black" style={styles.icon} />
                    <Text style={{ paddingRight: 5}}>Sign Out</Text>
                </TouchableOpacity>
                <AddTodo 
                    submitHandler={submitHandler}
                    updateHandler={updateHandler}
                    updateView={updateView}
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                />
                    <View style={styles.list}>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={todos}
                            renderItem={({ item }) => (
                                <TodoItem
                                    item={item}
                                    handleDelete={handleDelete}
                                    handleCurrentView={handleCurrentView}
                                />
                            )}
                        />
                    </View>
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
    list: {
        flex: 1,
        marginTop: 20,
    },
    signOut: {
        flexDirection: 'row-reverse',
        marginBottom: 15
    }
});
