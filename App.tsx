
import { StatusBar } from 'expo-status-bar';
  import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from 'navigation/main-tab-navigator';
import { DeckScreen } from 'screens/deck-screen';
import { ReviewScreen } from 'screens/review';





  export default function App() {

    const stack = createNativeStackNavigator();

    
    return (
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
          options={{
            headerShown: false
          }}
          name='Main' component={MainTabNavigator} />
          <stack.Screen name='Deck' component={DeckScreen}/>
          <stack.Screen name='Review' component={ReviewScreen}/>          
        </stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }


