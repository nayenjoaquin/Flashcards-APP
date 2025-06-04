import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import type { StackNavigationProp } from "@react-navigation/stack";
import { FilledButton } from "components/filled-button";
import useCards from "hooks/flashcards";

export const DeckScreen = () => {
  type DeckScreenRouteProp = RouteProp<RootStackParamList, "Deck">;
  type navigationProp = StackNavigationProp<RootStackParamList, "Deck">;

  const route = useRoute<DeckScreenRouteProp>();
  const navigation = useNavigation<navigationProp>();

  const { deck } = route.params;
  const { cards } = useCards(deck.id);

  useLayoutEffect(() => {
    navigation.setOptions({ title: '',
     });
  }, [navigation, deck.name]);

  return (
    <View className="h-full flex items-center justify-center p-5">
      <SafeAreaView className="w-full h-full flex items-center justify-center gap-5">
        <Text className="text-3xl font-bold">{deck.name}</Text>
        <FilledButton text="Review now" onPress={()=>{
          navigation.push('Review',
            {
              cards: cards,
              deckName: deck.name
            }
          )
        }} />
        <ScrollView className="w-full h-full">
        <View className="w-full h-full flex items-center justify-center gap-2.5">
          {cards.map((card) => (
            <View key={card.id} className="p-2.5 w-full flex flex-col gap-0 border border-gray-200 bg-white rounded-lg">
              <Text className="text-md font-semibold">{card.front}</Text>
              <Text className="text-gray-600">{card.back}</Text>
            </View>
          ))}
        </View>
        </ScrollView>
        {cards.length === 0 && (
          <Text className="text-gray-500 text-center mt-5">
            No flashcards available in this deck.
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
};
