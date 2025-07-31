import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CardsListItem } from "./cards-list-item";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Progress, ProgressMap } from "types";
import useDecks from "shared/hooks/decks";
import { BottomInnerShadow } from "components/visuals/bottom-inner-shadow";
import { CardOptionsModal } from "./card-options-modal";
import { AuthStore } from "shared/stores/auth";
import { Ionicons } from "@expo/vector-icons";
import appTheme from "shared/const/app-theme";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import useCards from "shared/hooks/flashcards";

interface props  {
    cards: Card[];
}

type navigationProp = StackNavigationProp<RootStackParamList, "Deck">;

export const DeckCardsList = ({cards} : props) => {

    const navigation = useNavigation<navigationProp>();
    const [selected, setSelected] = useState<Card[]>([]);
    const [selecting, setSelecting] = useState(false);
    const [currentCard, setCurrentCard] = useState<Card|null>(null);
    const { currentDeck} = useDecks();
    const {deleteCard} = useCards();
    return(
        <View className="flex-1 w-full">
            {
                currentCard ?
                <View className="absolute z-10 bottom-0 -left-5 h-screen w-screen flex ">
                    <Pressable className="h-full w-full absolute bg-black opacity-20" onPress={()=> setCurrentCard(null)}/>
                    <CardOptionsModal onClose={()=>setCurrentCard(null)} onDelete={()=>{
                        deleteCard(currentCard.id).then(success=>{
                            if(!success)console.error('Failed to delete card, please try again.');
                            setCurrentCard(null);
                            return;
                        })
                    }}/>
                        </View>
                : null
            }
            <ScrollView className=" w-full">
                <View className=" flex w-full items-center justify-center gap-2.5">
                    <View className="w-full flex flex-row items-center justify-between">
                        <Text className=" font-semibold">Cards in deck ({cards.length})</Text>
                        <TouchableOpacity onPress={()=>{
                            navigation.push('NewCard');
                        }}>
                            <Ionicons name="create-outline" size={appTheme.size.m}/>
                        </TouchableOpacity>
                    </View>
                    {cards.map((card) => (
                    <CardsListItem key={card.id} progress={currentDeck?.progress?.[card.id] ?? null} card={card} selected={selected.includes(card)}selecting={selecting} onTap={
                        !selecting ?
                            (card: Card)=>{
                                setCurrentCard(card);
                            }
                        : !selected.includes(card) ?
                            ()=>{
                                setSelected(prev=>[...prev, card]);
                            }
                        :
                            ()=>{
                                setSelected(prev=>{
                                    return prev.filter(item=>item!=card)
                                });
                            }
                        }/>
                    ))}
                </View>
            </ScrollView>
             <BottomInnerShadow/>
        </View>
    )
}