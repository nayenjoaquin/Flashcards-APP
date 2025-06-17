import { DeckListItem } from "components/layout/deck-list-item";
import useDecks from "hooks/decks";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export const ExploreScreen = () => {

  const {decks, myDecks, fetchDecks, saveDeck, removeSavedDeck} = useDecks();

  useEffect(()=>{
    fetchDecks();
  }, []);
  return (
    <View className="p-5">
      <SafeAreaView className="flex items-center justify-center h-full w-full gap-5">
        <Text className="text-2xl font-bold">
          Find new Decks
        </Text>
        <ScrollView className="w-full h-full">
          <View className="flex h-full w-full flex-col gap-2.5">
            {decks?.map(deck => (
              <DeckListItem 
                key={deck.id}
                deck={deck}
                onTap={() => {}}
                onSave={saveDeck}
                onRemove={removeSavedDeck}
                saved={myDecks.some(myDeck => myDeck.id === deck.id)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}