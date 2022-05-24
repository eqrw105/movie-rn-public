import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { useColorScheme } from "react-native";
import { BLACK_COLOR, INDICATOR_ACTIVE_DARK_COLOR, INDICATOR_ACTIVE_LIGHT_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../colors";
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const Tabs = () =>  {
    const isDark = useColorScheme() === 'dark';
    return (
    <Tab.Navigator 
    sceneContainerStyle= {{
        backgroundColor: isDark ? BLACK_COLOR : "white"
    }}
    screenOptions={{
        tabBarStyle: {
            backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? INDICATOR_ACTIVE_DARK_COLOR : INDICATOR_ACTIVE_LIGHT_COLOR,
        headerStyle: {
            backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        headerTitleStyle: {
            color: isDark ? WHITE_COLOR : BLACK_COLOR, 
        },
        tabBarLabelStyle: {
            marginTop: -5,
            fontSize: 12,
            fontWeight: '500'
        },
        unmountOnBlur: true
    }}>
        <Tab.Screen options={{
            tabBarIcon: ({ focused, color, size}) => {
                return <Ionicons name={focused ? 'film' : 'film-outline'} color={color} size={size} />
            }
        }} name='Movies' component={Movies}></Tab.Screen>
        <Tab.Screen options={{
            tabBarIcon: ({ focused, color, size}) => {
                return <Ionicons name={focused ? 'tv' : 'tv-outline'} color={color} size={size} />
            }
        }} name='Tv' component={Tv}></Tab.Screen>
        <Tab.Screen options={{
            tabBarIcon: ({ focused, color, size}) => {
                return <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={size} />
            }
        }} name='Search' component={Search}></Tab.Screen>
    </Tab.Navigator>
    );
};
export default Tabs;