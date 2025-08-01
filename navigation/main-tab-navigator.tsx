import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenContent } from "components/ScreenContent";
import { useAuth } from "shared/hooks/auth";
import { useEffect } from "react";
import { LibraryScreen } from "screens/library-screen";
import { MainTabParamList, RootStackParamList } from "types/navigation";
import { AuthStore } from "shared/stores/auth";
import { ProfileScreen } from "screens/profile-screen";
import { HomeScreen } from "screens/home-screen";
import { ExploreScreen } from "screens/explore-screen";

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
        <Tab.Navigator screenOptions={{
            
            headerTitleStyle: {
            paddingHorizontal: 16, // Padding within the title itself
            },
            headerLeftContainerStyle: {
            paddingLeft: 16, // Padding for the left component (e.g., back button)
            },
            headerRightContainerStyle: {
            paddingRight: 16, // Padding for the right component
            },
        }}>
        <Tab.Screen name='Home' component={HomeScreen} options={{
            tabBarIcon: ({color, size, focused})=>(
            <Ionicons name={focused ? 'home':'home-outline'} size={size} color={color}/>
            ),
            tabBarActiveTintColor: '#8a8eca',
            tabBarInactiveTintColor: 'gray',
        }}/>
        <Tab.Screen
            name="Library"
            component={LibraryScreen}
            options={{ title: 'Library',
                headerTitle: 'Saved Decks',
            tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? 'albums' : 'albums-outline';
        
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#8a8eca',
            tabBarInactiveTintColor: 'gray',
        }}
        /> 
        <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
            tabBarIcon: ({color, size, focused})=>(
                <Ionicons
                name={focused ? 'search' : 'search'}
                size={size}
                color={color}
                />
            ),
            tabBarActiveTintColor: '#8a8eca',
            tabBarInactiveTintColor: 'gray',
        }}
        />
        <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
            tabBarIcon: ({color, size, focused})=>(
                <Ionicons
                name={focused ? 'person' : 'person-outline'}
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