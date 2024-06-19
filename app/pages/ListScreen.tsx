import React from "react";
import { Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "@/constants/Screens";



export default function ListScreen() {
    const navigation = useNavigation();
    return (
        <FlatList
            data={SCREENS}
            renderItem=
            {
                ({ item }) =>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(item as never)}
                        style={styles.listItem}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>
            }
            keyExtractor={item => item}
        />
    );
}



const styles = StyleSheet.create({
    listItem: {
        padding: 17,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});