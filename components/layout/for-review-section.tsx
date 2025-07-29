import { ScrollView, Text, View } from "react-native";
import { Deck } from "types"
import { DeckTile } from "./deck-tile";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "types/navigation";
import { useNavigation } from "@react-navigation/native";

interface props {
    decks: Deck[];
}

type navProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export const ForReviewSection = ({decks}: props) => {
    const navigation = useNavigation<navProp>();
    return(
        <View className=" flex w-full justify-center gap-5">
            <Text className="text-2xl font-semibold">Your decks for review</Text>
            <ScrollView className="w-full max-h-[300px]">
                <View className="flex w-full flex-col gap-5">
                    {   decks.length==0
                    ?
                        <Text>
                            No decks for review
                        </Text>
                    :
                        decks.map((deck, index) => (
                            <DeckTile
                                deck={deck}
                                onTap={()=> {
                                    navigation.navigate('Deck', { deck });
                                }}
                            key={index}
                        />
                    ))
                }
                </View>
            </ScrollView>
        </View>
    )
}