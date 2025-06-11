import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import type { StackNavigationProp } from "@react-navigation/stack";
import { FilledButton } from "components/filled-button";
import useCards from "hooks/flashcards";
import { Ionicons } from "@expo/vector-icons";
import { FloatingIconButton } from "components/floating-icon-button";
import { cardsForReview, DEFAULT_PROGRESS, getDeckProgress } from "shared/utils";
import { DeckProgressBoard } from "components/deck-progress-board";
import { create } from "zustand";

interface storeProps{
  progress: Record<string, progress> | undefined;
  setProgress: (progress: Record<string, progress> | null)=>void
}

export const progressStore = create<storeProps>(set=>({
  progress : undefined,
  setProgress: (progress)=>set(prev=>{
    if(!progress){
      return prev
    }else{
      return {progress};
    }
  })
}));

export const DeckScreen = () => {
  type DeckScreenRouteProp = RouteProp<RootStackParamList, "Deck">;
  type navigationProp = StackNavigationProp<RootStackParamList, "Deck">;

  const route = useRoute<DeckScreenRouteProp>();
  const navigation = useNavigation<navigationProp>();

  const { deck, onDelete } = route.params;
  const { cards, createCard } = useCards(deck.id);
  const {progress, setProgress} = progressStore();

  useLayoutEffect(() => {
    navigation.setOptions({ title: '',
     });
  }, [navigation, deck.name]);

  useEffect(()=>{
        getDeckProgress(deck.id)
        .then(progress=>{
          setProgress(progress)
        })
    },[]);

  return (
    <View className="h-full flex items-center justify-center p-5">
      <SafeAreaView className="w-full h-full flex items-center justify-center gap-2.5">
        <FloatingIconButton
        icon="add"
        onPress={()=>{
          navigation.push('NewCard',{
            onSubmit: createCard
          })
        }}
        color="#6260a2"/>
        <Text className="text-2xl font-semibold w-full">{deck.name}</Text>
          <Text className="text-gray-500 w-full ">{deck.description}</Text>
        {cards.length>0 ?
        <View className="flex items-start w-full bg-white p-5 py-10 rounded-xl">
          <Text className="text-5xl font-semibold w-full text-center">{cardsForReview(progress??DEFAULT_PROGRESS(cards))}</Text>
          <Text className="text-md font-semibold w-full text-center">cards for review</Text>
          <DeckProgressBoard progress={progress??DEFAULT_PROGRESS(cards)}/>
            <View className="py-5 w-full">
              <FilledButton text="Review now" onPress={()=>{
                
                navigation.push('Review',
                  {
                    cards: cards,
                    deck: deck,
                    progress: progress?? DEFAULT_PROGRESS(cards)
                  }
                )
              }} />
            </View>
        </View>
        :null}
        {cards.length === 0 ?
          <View className=" w-full flex grow items-center justify-center gap-5">
            <Text className="text-gray-500 text-center flex">
              No cards in this deck.
            </Text>
            <FilledButton text="Add cards" onPress={()=>{
              navigation.push('NewCard', {
                onSubmit: createCard,
              })
            }}/>
          </View>
        :
          <ScrollView className=" w-full">
            
          <View className=" flex items-center justify-center gap-2.5">
            <Text className="w-full font-semibold">Cards in deck ({cards.length})</Text>
            {cards.map((card) => (
              <View key={card.id} className="p-2.5 w-full flex flex-col gap-0 border border-gray-200 bg-white rounded-lg">
                <Text className="text-md font-semibold">{card.front}</Text>
                <Text className="text-gray-600">{card.back}</Text>
              </View>
            ))}
          </View>
          </ScrollView>
        }
        <TouchableOpacity onPress={async ()=>{
          await onDelete(deck.id);
          navigation.goBack();
        }} className="w-full bg-white rounded-xl p-5 flex flex-row justify-start items-center gap-5">
          <Ionicons color={'red'} name="trash-bin" size={24}/>
          <Text className="text-red-500 font-semibold text-xl">Delete deck</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
