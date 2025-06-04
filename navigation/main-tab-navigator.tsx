import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenContent } from "components/ScreenContent";
import { DecksScreen } from "screens/decks-screen";
import { MainTabParamList } from "types/navigation";

export const MainTabNavigator = () => {

    const Tab = createBottomTabNavigator<MainTabParamList>();
    return(
        <Tab.Navigator>
        <Tab.Screen name='Home' component={ScreenContent} options={{
            tabBarIcon: ({color, size, focused})=><Ionicons name={focused ? 'home':'home-outline'} size={size} color={color}/>,
            tabBarActiveTintColor: '#8a8eca',
            tabBarInactiveTintColor: 'gray',
        }}/>
        <Tab.Screen
            name="Decks"
            component={DecksScreen}
            options={{ title: 'Decks',
                headerTitle: 'My Decks',
            tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? 'albums' : 'albums-outline';
        
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#8a8eca',
            tabBarInactiveTintColor: 'gray',
        }}
        />  
        </Tab.Navigator>
    )
}