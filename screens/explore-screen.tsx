import { FilledTextField } from "components/inputs/filled-textfield ";
import { LabeledTextField } from "components/inputs/labeled-textfield";
import { DeckListItem } from "components/layout/deck-list-item";
import useDecks from "hooks/decks";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export const ExploreScreen = () => {

  const {decks, myDecks, fetchDecks, saveDeck, removeSavedDeck, searchDeck} = useDecks();
  const [search, setSearch] = useState('');

  useEffect(()=>{
    fetchDecks();
  }, []);
  return (
    <View className="p-5">
      <SafeAreaView className="flex items-center justify-center h-full w-full gap-5">
        <Text className="text-2xl font-bold">
          Find new Decks
        </Text>
        <FilledTextField
         onChange={async(text)=>{
          setSearch(text);
          await searchDeck(text);
        }}
         placeholder="Search by deck name..."
         value={search}
         />
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