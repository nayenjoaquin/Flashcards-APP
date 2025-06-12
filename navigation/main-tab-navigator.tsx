import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenContent } from "components/ScreenContent";
import { useAuth } from "hooks/auth";
import { useEffect } from "react";
import { DecksScreen } from "screens/decks-screen";
import { MainTabParamList, RootStackParamList } from "types/navigation";
import { AuthStore } from "shared/stores/auth";
import { SettingsScreen } from "screens/settings-screen";

type navProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const MainTabNavigator = () => {

    const Tab = createBottomTabNavigator<MainTabParamList>();
    const navigation = useNavigation<navProp>();
    const {detectUser} = useAuth();
    const auth = AuthStore();


    useEffect(()=>{
        detectUser().then(user=>{
            if(!user){
                navigation.reset({
                    index: 0,
                    routes:[{name:'Login'}]
                })
            }
            
        })
    }, [])

    return(
        <Tab.Navigator>
        <Tab.Screen name='Home' component={ScreenContent} options={{
            tabBarIcon: ({color, size, focused})=>(
            <Ionicons name={focused ? 'home':'home-outline'} size={size} color={color}/>
            ),
            tabBarActiveTintColor: '#8a8eca',
            tabBarInactiveTintColor: 'gray',
        }}/>
        <Tab.Screen
            name="Decks"
            component={DecksScreen}
            options={{ title: 'Library',
                headerTitle: 'My Decks',
            tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? 'albums' : 'albums-outline';
        
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#8a8eca',
            tabBarInactiveTintColor: 'gray',
        }}
        /> 
        <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
            tabBarIcon: ({color, size, focused})=>(
                <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={size}
                color={color}
                />
            ),
            tabBarActiveTintColor: '#8a8eca',
            tabBarInactiveTintColor: 'gray',
        }}
        />

        </Tab.Navigator>
    )
}