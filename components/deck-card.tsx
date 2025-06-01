import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { DecksStackParamList } from "types/navigation";

interface DeckProps{
    deck: Deck;
    index: number;
}


type NavigationProp = NativeStackNavigationProp<DecksStackParamList, 'Decks'>;

export const DeckCard = ({deck, index}: DeckProps) => {

    const navigation = useNavigation<NavigationProp>();

    const goToDeck = () =>{

        navigation.navigate('Deck',{
            deck: deck
        })

    }
    return(
        <View className={`w-1/2 ${index%2==0 ?'pr-2.5' : 'pl-2.5'} ${index>1 ? 'pt-5' :''}`}>
            <Pressable onPress={goToDeck}>
                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 2,
                    elevation: 5,
                }} className="flex flex-col gap-2.5 p-2.5 bg-white rounded-md">
                    <View className="aspect-[3/4] bg-neutral-300 w-full"></View>
                    <Text>{deck.name}</Text>
                </View>
            </Pressable>
        </View>
    )
}