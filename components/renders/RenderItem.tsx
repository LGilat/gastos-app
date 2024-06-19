import React from'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import  {Category}  from '@/constants/Categorias';


const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
    },
   fontstyle: {
        fontSize: 18,
        fontWeight: '500',
    },
    iconmargin:{
        marginRight: 80,
        marginLeft: 20,
    },

});

const renderItem = ({ item }: { item: Category }, selectedCategoryId: string | null, handleSelectCategory: (item: Category) => void) => {
    const isSelected = selectedCategoryId === item.id;
    return (
        <TouchableOpacity onPress={() => handleSelectCategory(item)}>
            <View style={styles.listItem}>
                <Ionicons
                    name={item.selectedIcon as any}
                    size={32}
                    color={isSelected ? 'blue' : 'black'}
                    key={item.id}
                    style={styles.iconmargin}
                />
                <Text style={styles.fontstyle}>{item.selectedCategory}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default renderItem;