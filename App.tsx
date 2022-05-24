import React, { useState } from 'react';
import { Text, Image, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme } from './styled';
import { lightTheme } from './styled';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() == "dark";
  const [loaded] = useFonts(Ionicons.font);
  if (!assets || !loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}