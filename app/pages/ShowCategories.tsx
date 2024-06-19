import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { getData, storeData } from '@/asyncstorage/storeingData'
import { CATEGORIES, Category } from '@/constants/Categorias';
import { FlatList } from 'react-native-gesture-handler';
import RenderItem from '@/components/renders/RenderItem'





export default function ShowCategories() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const data = await getData(CATEGORIES);
                console.log('Data from getData:', data);
                if (data) {
                    setCategories(Array.isArray(data) ? data : [data]);
                } else {
                    setCategories([]);
                }
            } 
            catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();

    },[])

    const handleSelectCategory = ( item: Category ) => {
        setSelectedCategoryId(item.id);
        setSelectedCategory(item);
    }


    function handleUpdateCategory(itemCategory: Category): void {
        const newCategories = categories.map((category) => {
            if (category.id === itemCategory.id) {
                return itemCategory;
            }
            return category;
        });
        setCategories(newCategories);
        storeData(CATEGORIES, newCategories);
        setSelectedCategoryId(null);
        setSelectedCategory(null);
    }

    function handleDeleteCategory(itemCategory: Category): void {
        const newCategories = categories.filter((category) => category.id!== itemCategory.id);
        setCategories(newCategories);
        storeData(CATEGORIES, newCategories);
        setSelectedCategoryId(null);
        setSelectedCategory(null);
    }

    return (
        <>
            <FlatList 
                data={categories}
                renderItem={(item) => RenderItem(item, selectedCategoryId, handleSelectCategory)}
                keyExtractor={(item) => item.id}
            />
            {selectedCategory && ( // Render update form only if a category is selected
                <View>
                    <Text style={styles.titlecategory} > Update category</Text>
                    <TextInput
                        value={selectedCategory.selectedCategory}
                        onChangeText={(text) => setSelectedCategory({ ...selectedCategory, selectedCategory: text })}
                        style={[styles.fontstyle, styles.textbox]}
                        placeholder="Update Category Name"
                    />
                    <View style={styles.boxButton}>
                        <TouchableOpacity style={styles.button} onPress={() => handleUpdateCategory(selectedCategory)}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => handleDeleteCategory(selectedCategory)}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
}

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
    titlecategory: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },

    boxButton: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingVertical: 10,
    },
    button:{
        marginRight: 10,
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textbox: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    }

});