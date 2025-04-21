import { RouteProp, useRoute } from "@react-navigation/native"
import { SafeAreaView, Text, View } from "react-native"
import { RootStackParamList } from "types/navigation";


export const DeckScreen = () => {

    type DeeckScreenRouteProp = RouteProp<RootStackParamList, 'deck'>;

    const route = useRoute<DeeckScreenRouteProp>();
    const {did} = route.params;
    return(
        <View className="h-full flex items-center justify-center">
            <SafeAreaView>
                <Text className="text-3xl font-bold">{did}</Text>
            </SafeAreaView>
        </View>
    )
}