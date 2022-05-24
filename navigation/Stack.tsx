import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import Detail from '../screens/Detail';
import { BLACK_COLOR, WHITE_COLOR } from '../colors';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === "dark";
    return (
    <NativeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        headerTintColor: isDark ? WHITE_COLOR : BLACK_COLOR,
        headerBackTitleVisible: false,
        animation: 'slide_from_right'
    }}>
        <NativeStack.Screen name='Detail' component={Detail} />
    </NativeStack.Navigator>
    );
};

export default Stack;