import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import type { StackNavigationProp } from "@react-navigation/stack";
import { FilledButton } from "components/buttons/filled-button";
import useCards from "shared/hooks/flashcards";
import { Ionicons } from "@expo/vector-icons";
import { FloatingIconButton } from "components/buttons/floating-icon-button";
import { DeckCardsList } from "components/layout/deck-cards-list";
import { DeckViewHeader } from "components/layout/deck-screen-header";
import useDecks from "shared/hooks/decks";
import { getLocal, shuffleArray } from "shared/utils/common";
import { cardsForReview, readyForReview } from "shared/utils/spaced-repetition";
import { AuthStore } from "shared/stores/auth";
import { Card, Deck, NewCard, Progress } from "types";

type DeckScreenRouteProp = RouteProp<RootStackParamList, "Deck">;
  type navigationProp = StackNavigationProp<RootStackParamList, "Deck">;

export const DeckScreen = () => {
  

  const route = useRoute<DeckScreenRouteProp>();
  const navigation = useNavigation<navigationProp>();

  const { deck } = route.params;
  const {createCard } = useCards();
  const {currentDeck, setCurrentDeck, deleteDeck} = useDecks();
  const {user} = AuthStore();

  const onReviewFinished = (deck: Deck) => {
    setCurrentDeck({
      ...deck,
      last_reviewed_at: new Date()
    });
  };


  useLayoutEffect(() => {
    navigation.setOptions({ title: '',
     });
  }, [navigation, deck.name]);
  useEffect(() => {
    setCurrentDeck(deck);
  }, [deck]);

  return (
    <View className="h-full flex items-center justify-center p-5">
      <SafeAreaView className="w-full h-full flex flex-col items-center justify-center gap-2.5">
        {deck.user_id == user?.id ?
        <FloatingIconButton
          icon="add"
          onPress={()=>{
            navigation.push('NewCard',{
              onSubmit: async (card: NewCard)=>{
                return await createCard(card, deck.id);
              },
            })
          }}
          color="#6260a2"
        />
        :null}
        <Text className="text-2xl font-semibold w-full">{deck.name}</Text>
        <Text className="text-gray-500 w-full ">{deck.description}</Text>
        {deck.cards.length>0 ?
        <DeckViewHeader
        deck={currentDeck??deck}
          onReview={()=>{
            const cards = cardsForReview(currentDeck!.cards, currentDeck!.progress);

            if(!currentDeck!.progress){
              navigation.push('Review',{
                cards: shuffleArray(cards).slice(0,20),
                deck: currentDeck!,
                onReviewFinished: onReviewFinished
                })
              return;
            }
            if(!readyForReview(currentDeck!.last_reviewed_at)){
              console.error('The deck can only be reviewed once every 8 hours');
              return;
            }
            if(cards.length === 0){
              console.error('No cards available for review');
              
              return;
            }
            navigation.push('Review',
                {
                cards: cards,
                deck: currentDeck!,
                onReviewFinished: onReviewFinished
                }
            )
          }}
        />
        :null}
        {deck.cards.length === 0 ?
          <View className=" w-full flex grow items-center justify-center gap-5">
            <Text className="text-gray-500 text-center flex">
              No cards in this deck.
            </Text>
            <FilledButton text="Add cards" onPress={()=>{
              navigation.push('NewCard', {
                onSubmit: async (card: NewCard)=>{
                  return await createCard(card, deck.id);
                },
              })
            }}/>
          </View>
        :
          <DeckCardsList cards={deck.cards}/>
        }
        { user?.id == deck.user_id ?
        <TouchableOpacity onPress={async ()=>{
          await deleteDeck(deck.id);
          navigation.goBack();
        }} className="w-full bg-white rounded-xl p-5 flex flex-row justify-start items-center gap-5">
          <Ionicons color={'red'} name="trash-bin" size={24}/>
          <Text className="text-red-500 font-semibold text-xl">Delete deck</Text>
        </TouchableOpacity>
        : null
        }
      </SafeAreaView>
    </View>
  );
};
