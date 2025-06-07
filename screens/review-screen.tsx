import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FilledButton } from "components/filled-button";
import { FlashCard } from "components/FlashCard";
import { useEffect, useId, useLayoutEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import { DEFAULT_PROGRESS, getDeckProgress, saveDeckProgress, updateCard } from "utils/functions";

type routeProp = RouteProp<RootStackParamList, 'Review'>;
type navigationProp = NavigationProp<RootStackParamList, 'Review'>;

export const ReviewScreen = () => {

    const route  = useRoute<routeProp>();
    const navigation = useNavigation<navigationProp>();
    const [index, setIndex] = useState(0);

    const {cards, deck, progress} = route.params

    const [deckProgress, setDeckProgress] = useState(progress??DEFAULT_PROGRESS(cards))
    const [flipped, setFlipped] = useState(false);

    const nextCard = async() =>{
        if(index<cards.length-1){
            setIndex(prev=>{
                return prev+1}
            );
        }else{
            await saveDeckProgress(deckProgress, deck.id);
            navigation.goBack();
        }
        setFlipped(false);
    }

    useLayoutEffect(() => {
        navigation.setOptions({ title: deck.name,
            headerBackTitle: ''
        });
      }, [navigation, deck.name]);

      const updateProgress = (q:number)=>{
        const update =updateCard({
            ...deckProgress[cards[index].id],
            q: q
        })
        setDeckProgress(prev=>{
            prev[cards[index].id]=update;
            console.log(prev[cards[index].id]);
            
            return prev;
        }) 
        nextCard();

    }

    useEffect(()=>{
        if(deckProgress[cards[index].id].dueDate>new Date()){
            nextCard();
        }
    }, [index])

    return(
        <View className="w-full h-full p-5 flex gap-5">
                <FlashCard card={cards[index]} flipped={flipped} onFlip={()=>setFlipped(true)} onNext={nextCard} key={cards[index].id}/>
                {
                    flipped?
                    <View className="flex flex-row gap-2.5 w-full justify-center">
                    <FilledButton
                    text="Wrong"
                    color="red"
                    onPress={()=>updateProgress(0)}/>
                    <FilledButton
                    text="Good"
                    color="green"
                    onPress={()=>updateProgress(1)}/>
                    <FilledButton
                    text="Perfect"
                    color="blue"
                    onPress={()=>updateProgress(2)}/>
                    </View>
                    : null
                }
        </View>
    )
}