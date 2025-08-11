import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Modal, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import type { StackNavigationProp } from "@react-navigation/stack";
import { FilledButton } from "components/buttons/filled-button";
import useCards from "shared/hooks/flashcards";
import { Ionicons } from "@expo/vector-icons";
import { DeckCardsList } from "components/layout/deck-cards-list";
import { DeckViewHeader } from "components/layout/deck-screen-header";
import useDecks from "shared/hooks/decks";
import { readyForReview } from "shared/utils/spaced-repetition";
import { AuthStore } from "shared/stores/auth";
import { Card, Deck } from "types";
import { CardOptionsModal } from "components/layout/card-options-modal";
import { DeckOptionsModal } from "components/layout/deck-options-modal";
import appTheme from "shared/const/app-theme";

type DeckScreenRouteProp = RouteProp<RootStackParamList, "Deck">;
type navigationProp = StackNavigationProp<RootStackParamList, "Deck">;

export const DeckScreen = () => {
  

  const route = useRoute<DeckScreenRouteProp>();
  const navigation = useNavigation<navigationProp>();

  const { deck } = route.params;
  const {savedDecks, currentDeck, setCurrentDeck, deleteDeck, saveDeck, removeSavedDeck} = useDecks();
  const [deckOptions, showDeckOptions] = useState(false);
  const [cardOptions, showCardOptions] = useState(false);
  const {user} = AuthStore();
  const [saved, setSaved] = useState(savedDecks.map(d=>d.id).includes(deck.id));

  const onSave = () => {
    setSaved(true);
    saveDeck(deck).then(success=>{
      if(!success){
        setSaved(false);
      }
    });
} 

  const onRemove = () => {
    setSaved(false);
    removeSavedDeck(deck).then(success=>{
      if(!success){
        setSaved(true);
      }
    });
  }

  const handleReview = () => {
    try{
      const cards = readyForReview(currentDeck ?? deck)
      navigation.push('Review',
          {
          cards: cards,
          deck: currentDeck!,
          onReviewFinished: onReviewFinished
          }
      )
    }catch(err){
      console.error(err);
      
    }
  }

  const onReviewFinished = (deck: Deck) => {

    setCurrentDeck({
      ...deck,
      last_reviewed_at: new Date()
    });
  };

  const closeModal = ()=>{
    showCardOptions(false);
    showDeckOptions(false);
  }


  useLayoutEffect(() => {
    if(deck.user_id == user?.id){
      navigation.setOptions({ title: '',
        headerRight: ()=>(
          <TouchableOpacity onPress={()=>{
            showDeckOptions(true);
          }}>
              <Ionicons name='ellipsis-horizontal' size={32} />
          </TouchableOpacity>
        )
      });
    }
  }, [navigation, deck.name]);
  useEffect(() => {
    setCurrentDeck(deck);
  }, [deck]);

  return (
    <View className="relative h-full flex items-center justify-center p-5">
      <SafeAreaView className="w-full h-full flex flex-col items-center justify-center gap-2.5">
        <Modal
        visible={cardOptions || deckOptions}
        onRequestClose={closeModal}
        transparent
        animationType="slide"
        >
          {
            cardOptions ?
            <CardOptionsModal onClose={closeModal} onDelete={()=>{}}/>
            :
            <DeckOptionsModal onClose={closeModal} onDelete={()=>{
              deleteDeck(deck.id).then(success=>{
                if(success){
                  navigation.goBack();
                }else console.error('Failed to delete deck, please try again later');
                
              })
            }}
            onEdit={()=>{
              closeModal();
              navigation.push('EditDeck', {
                deck: currentDeck ?? deck
              });
            }}
            />
          }
        </Modal>
        <View className="flex flex-row w-full justify-between items-center">
          <Text className="text-2xl font-semibold">{currentDeck?.name}</Text>
          <TouchableOpacity onPress={saved ? onRemove : onSave}>
            <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={appTheme.size.l}/>
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 w-full ">{currentDeck?.description}</Text>
        {currentDeck?.cards.length!=0 ?
        <DeckViewHeader
        deck={currentDeck??deck}
          saved = {saved}
          onReview={saved ? handleReview : onSave}
        />
        :null}
        {currentDeck?.cards.length === 0 ?
          <View className=" w-full  flex grow items-center justify-center gap-5">
            <Text className="text-gray-500 text-center flex">
              No cards in this deck.
            </Text>
            <FilledButton text="Add cards" onPress={()=>{
              navigation.push('NewCard')
            }}/>
          </View>
        :
          <DeckCardsList
          cards={currentDeck?.cards??[]}
          onCardOptions={(card: Card)=>showCardOptions(true)}
          />
        }
      </SafeAreaView>
    </View>
  );
};
