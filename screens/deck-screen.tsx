import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import type { StackNavigationProp } from "@react-navigation/stack";
import { FilledButton } from "components/buttons/filled-button";
import useCards from "shared/hooks/flashcards";
import { Ionicons } from "@expo/vector-icons";
import { FloatingIconButton } from "components/buttons/floating-icon-button";
import { DeckProgressBoard } from "components/layout/deck-progress-board";
import { progressStore } from "shared/stores/progress";
import { DeckCardsList } from "components/layout/deck-cards-list";
import { DeckViewHeader } from "components/layout/deck-screen-header";
import useDecks from "shared/hooks/decks";
import { getLocal, shuffleArray } from "shared/utils/common";
import { cardsForReview, readyForReview } from "shared/utils/spaced-repetition";
import { LinearGradient } from "expo-linear-gradient";
import { AuthStore } from "shared/stores/auth";
import { useProgress } from "shared/hooks/progress";
import { DeckProgress, Progress } from "types";

type DeckScreenRouteProp = RouteProp<RootStackParamList, "Deck">;
  type navigationProp = StackNavigationProp<RootStackParamList, "Deck">;

export const DeckScreen = () => {
  

  const route = useRoute<DeckScreenRouteProp>();
  const navigation = useNavigation<navigationProp>();

  const { deck } = route.params;
  const { cards, createCard, } = useCards(deck.id);
  const {getProgress, progress, saveProgress} = useProgress();
  const {deleteDeck} = useDecks();
  const {user} = AuthStore();


  useLayoutEffect(() => {
    navigation.setOptions({ title: '',
     });
  }, [navigation, deck.name]);

  useEffect(()=>{
    getProgress(deck.id);
    },[cards]);

  return (
    <View className="h-full flex items-center justify-center p-5">
      <SafeAreaView className="w-full h-full flex flex-col items-center justify-center gap-2.5">
        {deck.user_id == user?.id ?
        <FloatingIconButton
          icon="add"
          onPress={()=>{
            navigation.push('NewCard',{
              onSubmit: createCard
            })
          }}
          color="#6260a2"
        />
        :null}
        <Text className="text-2xl font-semibold w-full">{deck.name}</Text>
        <Text className="text-gray-500 w-full ">{deck.description}</Text>
        {cards.length>0 ?
        <DeckViewHeader
        cards={cards}
          onReview={()=>{
            if(!progress){
              navigation.push('Review',{
                cards: shuffleArray(cards).slice(0,20),
                deck: deck,
                })
              return;
            }
            if(!readyForReview(progress.lastReviewed!)){
              console.error('The deck can only be reviewed once every 8 hours');
              return;
            }
            if(cardsForReview(cards, progress?.progress).length === 0){
              console.error('NO CARDS FOR REVIEW');
              return;
            }
            navigation.push('Review',
                {
                cards: cardsForReview(cards, progress?.progress)??cards,
                deck: deck,
                }
            )
          }}
        />
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
          <DeckCardsList cards={cards}/>
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
