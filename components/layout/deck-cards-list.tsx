import { ScrollView, Text, View } from "react-native";
import { CardsListItem } from "./cards-list-item";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Progress, ProgressMap } from "types";
import useDecks from "shared/hooks/decks";

interface props  {
    cards: Card[];
}

export const DeckCardsList = ({cards} : props) => {

    const [selected, setSelected] = useState<Card[]>([]);
    const [selecting, setSelecting] = useState(false);
    const { currentDeck} = useDecks();
    return(
        <View className="flex-1 w-full">
            <ScrollView className=" w-full">
                <View className=" flex w-full items-center justify-center gap-2.5">
                    <Text className="w-full font-semibold">Cards in deck ({cards.length})</Text>
                    {cards.map((card) => (
                    <CardsListItem key={card.id} progress={currentDeck?.progress?.[card.id] ?? null} card={card} selected={selected.includes(card)}selecting={selecting} onTap={
                        !selecting ?
                            ()=>{}
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
             <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.15)']}
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 30,
            }}
            pointerEvents="none"
        />
        </View>
    )
}