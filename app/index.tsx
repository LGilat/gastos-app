import * as React from 'react';

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriasScreen from '@/app/Categorias';
import DetailsScreen from '@/app/pages/Details';
import ListScreen from '@/app/pages/ListScreen';
import ShowCategories from '@/app/pages/ShowCategories';



const RootStack = createNativeStackNavigator({
    initialRouteName: 'ListScreens',
    screenOptions: {
        headerStyle: { backgroundColor: 'tomato' },
      },
    screens: {
        Categorias: CategoriasScreen,
        Details: DetailsScreen,
        ListScreens: ListScreen,
        ShowCategories: ShowCategories,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}