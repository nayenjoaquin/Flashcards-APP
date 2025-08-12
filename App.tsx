
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
import { RegisterScreen } from 'screens/register-screen';
import { EditDeckScreen } from 'screens/edit-deck-screen';
import { EditCardScreen } from 'screens/edit-card';

  export default function App() {

    const stack = createStackNavigator();

    
    return (
      <NavigationContainer>
        <stack.Navigator screenOptions={{
          headerTintColor: 'black',
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
        <stack.Screen name='NewCard' component={NewCardScreen} options={{
          headerTitle: 'New Card'
        }}/>
        <stack.Screen name='EditCard' component={EditCardScreen} options={{
          headerTitle: 'Edit Card'
        }}/>
        <stack.Screen name='Login' component={LogInScreen}/>
        <stack.Screen name='Register' component={RegisterScreen}/>
        <stack.Screen name='EditDeck' component={EditDeckScreen} options={{
          headerTitle: 'Edit Deck'
        }}/>
        </stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }


