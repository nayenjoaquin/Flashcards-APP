import { Text, View } from "react-native";

interface DeckProps{
    deck: Deck;
    index: number;
}

export const DeckCard = ({deck, index}: DeckProps) => {
    return(
        <View className={`w-1/2 ${index%2==0 ?'pr-2.5' : 'pl-2.5'} ${index>1 ? 'pt-5' :''}`}>
        <View style={{
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.25,
  shadowRadius: 2,
  elevation: 5,}} className="flex flex-col gap-2.5 p-2.5 bg-white rounded-md">
            <View className="aspect-[3/4] bg-neutral-300 w-full"></View>
            <Text>{deck.title}</Text>
        </View>
        </View>
    )
}