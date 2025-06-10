
import { StatusBar } from 'expo-status-bar';
  import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigator } from 'navigation/main-tab-navigator';
import { DeckScreen } from 'screens/deck-screen';
import { ReviewScreen } from 'screens/review-screen';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NewCardScreen } from 'screens/new-card-screen';
import { LogInScreen } from 'screens/log-in-screen';

  export default function App() {

    const stack = createStackNavigator();

    
    return (
      <NavigationContainer>
        <stack.Navigator screenOptions={{
          headerTintColor: 'black'
        }}>

          <stack.Screen
          options={{
            headerShown: false
          }}
          name='Main' component={MainTabNavigator} />

          <stack.Screen options={({navigation}) =>({
            headerBackTitle: '',
          })} name='Deck' component={DeckScreen}/>

          <stack.Screen options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}

            >
              <Ionicons name="close" size={32} />
              {/* or use Feather: name="x" */}
            </TouchableOpacity>
          ),
        })} name='Review' component={ReviewScreen}/>
        <stack.Screen name='NewCard' component={NewCardScreen}/>
        <stack.Screen name='Login' component={LogInScreen}/>
        </stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }


