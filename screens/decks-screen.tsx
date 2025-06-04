import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DeckCard } from "components/deck-card";
import useDecks from "hooks/decks";
import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import { DecksStackParamList} from "types/navigation";



type NavigationProp = NativeStackNavigationProp<DecksStackParamList, 'Decks'>;

export const DecksScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const {decks, loading, error} = useDecks();


    return(
        <ScrollView className="w-full flex flex-col bg-neutral-100 p-5">
                {
                    loading ?
                    <View className="h-full flex w-full items-center justify-center"><ActivityIndicator size="large"/></View>
                    :
                    error ?
                    <Text className="text-3xl font-bold">{error}</Text>
                    : <View className="flex flex-row flex-wrap justify-center">
                            {decks.map((deck: Deck, index: number)=>{
                            return <DeckCard deck={deck} key={deck.id} index={index}/>
                            })}
                        </View>
                }
        </ScrollView>
    )
}