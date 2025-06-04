import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlashCard } from "components/FlashCard";
import { useLayoutEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "types/navigation";

type routeProp = RouteProp<RootStackParamList, 'Review'>;
type navigationProp = NavigationProp<RootStackParamList, 'Review'>;

export const ReviewScreen = () => {

    const nextCard = () =>{
        setIndex(prev => {
            if(prev < (cards.length-1)){
                return prev+1;
            }else{
                return 0;
            }
        });
    }

    const route  = useRoute<routeProp>();
    const navigation = useNavigation<navigationProp>();
    const [index, setIndex] = useState(0);

    const {cards, deckName} = route.params

    useLayoutEffect(() => {
        navigation.setOptions({ title: deckName });
      }, [navigation, deckName]);
    return(
        <View className="w-full h-full p-10 flex">
                <FlashCard card={cards[index]} next={nextCard}/>
        </View>
    )
}