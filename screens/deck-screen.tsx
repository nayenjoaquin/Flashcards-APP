import { RouteProp, useRoute } from "@react-navigation/native"
import { SafeAreaView, Text, View } from "react-native"
import { DecksStackParamList} from "types/navigation";


export const DeckScreen = () => {

    type DeeckScreenRouteProp = RouteProp<DecksStackParamList, 'Deck'>;

    const route = useRoute<DeeckScreenRouteProp>();
    const {deck} = route.params;
    return(
        <View className="h-full flex items-center justify-center">
            <SafeAreaView>
                <Text className="text-3xl font-bold">{deck.title}</Text>
            </SafeAreaView>
        </View>
    )
}