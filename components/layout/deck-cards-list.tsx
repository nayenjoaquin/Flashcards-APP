import { ScrollView, Text, View } from "react-native";
import { CardsListItem } from "./cards-list-item";
import { useState } from "react";

interface props  {
    cards: Card[];
}

export const DeckCardsList = ({cards} : props) => {

    const [selected, setSelected] = useState<Card[]>([]);
    const [selecting, setSelecting] = useState(false);
    return(
        <ScrollView className=" w-full">
            
          <View className=" flex items-center justify-center gap-2.5">
            <Text className="w-full font-semibold">Cards in deck ({cards.length})</Text>
            {cards.map((card) => (
              <CardsListItem card={card} selected={selected.includes(card)}selecting={selecting} onTap={
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
    )
}