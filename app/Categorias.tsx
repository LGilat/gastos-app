import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { storeData, getData } from '@/asyncstorage/storeingData'
import { CATEGORIES } from '@/constants/Categorias';
import { useNavigation } from '@react-navigation/native';
import 'react-native-reanimated';

const icons = [
  'home',
  'settings',
  'star',
  'add-circle',
  'close',
  'restaurant'
  // Add more icons as needed
];

interface Category {
  id:string,
  selectedIcon: string;
  selectedCategory: string;
}

export default function App() {
  const navigation = useNavigation();

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const data = await getData(CATEGORIES);
        console.log('Data from getData:', data);
        if (data) {
          setCategories(Array.isArray(data) ? data : [data]);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, [])

  function handleIconPress(iconName: string): void {
    setSelectedIcon(iconName);
  }

  function handleCategoriesPress(event: any): void {
    console.log('categoria: ', selectedCategory);
    console.log('icon : ', selectedIcon);
  }

  function handleButtonPress(): void {
    const categoria: Category = {
      id: Date.now().toString(), // Generar un ID único
      selectedIcon: selectedIcon ?? '',
      selectedCategory: selectedCategory ?? '',
    }

    const updatedCategories = [...categories, categoria];
    setCategories(updatedCategories);
    storeData(CATEGORIES, updatedCategories);
  }

  return (
    <View style={styles.container}>

      <View style={styles.IconoContainer}>
        {
          icons.map((iconName, index) => (
            <TouchableOpacity
              key={iconName}
              style={styles.iconButton}
              onPress={() => handleIconPress(iconName)}
            >
              <Ionicons
                name={iconName as any}
                size={32}
                color={selectedIcon === iconName ? "blue" : "grey"}
                key={iconName}
              />
            </TouchableOpacity>
          ))
        }

      </View>

      {/* Optionally, display the selected icon */}
      {selectedIcon && (
        <View style={styles.selectedIcon}>
          <Ionicons name={selectedIcon as any} size={40} color="blue" />
          <Text>Selected: {selectedIcon}</Text>
        </View>
      )}

      <View>
        <TextInput style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Escribe categoria"
          onChangeText={(text) => setSelectedCategory(text)}
        />
        <Button
          title="Press me"
          disabled={selectedIcon === null}
          onPress={handleButtonPress}
        />
      </View>

      <View style={styles.IconoContainer}>
        {
          categories?.map((category, index) => (
            <View key={category.id} style={styles.iconButton}>
              <TouchableOpacity
                key={category.id}
                style={styles.iconButton}
                onPress={() => handleCategoriesPress(category)}
              >
                <Ionicons
                  name={category.selectedIcon as any}
                  size={32}
                  color={category.selectedCategory === selectedCategory ? "blue" : "grey"}
                  key={category.id}
                />
              </TouchableOpacity>
              <Text> {category.selectedCategory } </Text>
            </View>
          ))
        }
      </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details' as never)}
          />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconButton: {
    margin: 10,
  },
  selectedIcon: {
    marginTop: 20,
    alignItems: 'center',
  },
  IconoContainer: {
    flexDirection: 'row',
  }
});


