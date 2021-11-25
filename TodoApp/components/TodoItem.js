import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TodoItem({ item, handleDelete, handleCurrentView }) {
    return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <MaterialIcons name="delete" size={18} color="black" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCurrentView(item)}>
                    <MaterialIcons name="edit" size={18} color="black" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderStyle: "dashed",
        borderColor: "#bbb",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#64d8cb",
        flexDirection: "row",
    },
    itemText: {
        marginLeft: 10,
    },
    icon: {
        paddingHorizontal: 6
    }
});
