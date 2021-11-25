import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

export default function AddTodo({ submitHandler, updateHandler, updateView, currentTask, setCurrentTask }) {
    const [text, setText] = useState("");
    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        if(currentTask.id && currentTask.name){
            setText(currentTask.name)
            setCurrentId(currentTask.id)
            setCurrentTask({});
        }
        
    },[currentTask])

    const changeHandler = (val) => {
        console.log('typing', val);
        setText(val);
    };

    //post new todo
    const submitNewTask = () => {
        submitHandler(text)
        setText("");
    }

    //update current todo
    const updateCurrentTask = () => {
        updateHandler(currentId, text);
        setCurrentId(null);
        setText("");
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                value={text}
                placeholder="add new todo..."
                onChangeText={changeHandler}
            />
            <Button
                onPress={() => updateView ? updateCurrentTask() : submitNewTask()}
                title={updateView ? "update todo" : "add todo"}
                color="#26a69a"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
});
