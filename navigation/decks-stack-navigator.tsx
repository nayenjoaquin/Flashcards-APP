// navigation/DecksStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DecksStackParamList } from '../types/navigation';
import { DecksScreen } from 'screens/decks-screen';
import { DeckScreen } from 'screens/deck-screen';

const Stack = createNativeStackNavigator<DecksStackParamList>();

export default function DecksStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={DecksScreen} />
      <Stack.Screen name="Deck" component={DeckScreen} />
    </Stack.Navigator>
  );
}
