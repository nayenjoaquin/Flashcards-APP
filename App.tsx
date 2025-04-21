
import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';




  import './global.css';
import { DecksScreen } from 'screens/decks-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootTabParamList } from 'types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DecksStackNavigator from 'navigation/decks-stack-navigator';
import { Ionicons } from '@expo/vector-icons';





  export default function App() {

    const stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator<RootTabParamList>();

    return (
      <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name='Home' component={ScreenContent} options={{
          tabBarIcon: ({color, size, focused})=><Ionicons name={focused ? 'home':'home-outline'} size={size} color={color}/>
        }}/>
        <Tab.Screen
          name="DecksStack"
          component={DecksStackNavigator}
          options={{ title: 'Decks', headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            const iconName = focused ? 'albums' : 'albums-outline';
      
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        }}
        />  
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }


