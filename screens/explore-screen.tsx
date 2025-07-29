import { FilledTextField } from "components/inputs/filled-textfield ";
import { LabeledTextField } from "components/inputs/labeled-textfield";
import { DeckListItem } from "components/layout/deck-list-item";
import useDecks from "shared/hooks/decks";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useExplore } from "shared/hooks/explore";
import { BottomInnerShadow } from "components/visuals/bottom-inner-shadow";

export const ExploreScreen = () => {

  const {savedDecks, saveDeck, removeSavedDeck} = useDecks();
  const {decks, loading, loadDecks} = useExplore();
  const [search, setSearch] = useState('');

  useEffect(()=>{
    loadDecks();
  }, []);
  return (
    <View className="pt-5">
      <SafeAreaView className="flex items-center justify-center h-full w-full gap-5">
        <Text className="text-2xl font-bold">
          Find new Decks
        </Text>
        <FilledTextField
         onChange={async(text)=>{
          setSearch(text);
        }}
         placeholder="Search by deck name..."
         value={search}
         />
         {loading ?
         <Text>Loading...</Text>
         :
         <ScrollView className="w-full h-full px-5">
          <View className="flex h-full w-full flex-col gap-2.5">
            {
              decks.map(deck=>(
                <DeckListItem
                deck={deck}
                key={deck.id}
                />
              ))
            }
          </View>
        </ScrollView>
        }
        <BottomInnerShadow/>
      </SafeAreaView>
    </View>
  );
}