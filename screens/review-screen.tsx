import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FilledButton } from "components/buttons/filled-button";
import { FlashCard } from "components/layout/FlashCard";
import { useEffect, useId, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "types/navigation";
import { cardsForReview, updateCard } from "shared/utils/spaced-repetition";
import { progressStore } from "shared/stores/progress";
import { saveLocal } from "shared/utils/common";
import { NEW_CARDS_PER_SESSION } from "shared/const/values";

type routeProp = RouteProp<RootStackParamList, 'Review'>;
type navigationProp = NavigationProp<RootStackParamList, 'Review'>;

export const ReviewScreen = () => {

    const route  = useRoute<routeProp>();
    const navigation = useNavigation<navigationProp>();
    const [index, setIndex] = useState(0);
    const [newCount, setNewCount] = useState(0);
    const {progress} = progressStore();

    const {cards, deck} = route.params;

    const {setProgress} = progressStore();

    const [session, setSession] = useState(progress)
    const [flipped, setFlipped] = useState(false);

    const finishSession = async() => {
        await saveLocal(deck.id, session);
            setProgress(session)
            navigation.goBack();
    }

    const nextCard = async() =>{
        if(index>=cards.length-1){
            finishSession();
            return;
        }
        setIndex(prev=>prev+1)
        setFlipped(false);
    }

    const updateProgress = (q:number)=>{
        if(session[cards[index].id].i==0){
            setNewCount(prev=>prev+1);
        }
        const update =updateCard({
            ...session[cards[index].id],
            q: q
        })
        
        setSession(prev=>{
            prev[cards[index].id]=update;
            return prev;
        }) 
        nextCard();

    }


    useLayoutEffect(() => {
        navigation.setOptions({ title: deck.name,
            headerBackTitle: ''
        });
      }, [navigation, deck.name]);

      useEffect(()=>{
        if (session[cards[index].id].i==0 && newCount>=NEW_CARDS_PER_SESSION){
            nextCard();
        }
      }, [index])


    useEffect(()=>{
        if(cardsForReview(session)==0){
            console.error('NO CARDS FOR REVIEW');
            navigation.goBack();
        }
    },[session])

    return(
        <View className="w-full h-full p-5 flex gap-5">
                <FlashCard card={cards[index]} flipped={flipped} onFlip={()=>setFlipped(true)} onNext={nextCard} key={cards[index].id}/>
                {
                    flipped?
                    <View className="flex flex-row gap-2.5 w-full justify-center">
                    <FilledButton
                    text="Wrong"
                    color="red"
                    grow
                    onPress={()=>updateProgress(0)}/>
                    <FilledButton
                    text="Good"
                    color="green"
                    grow
                    onPress={()=>updateProgress(1)}/>
                    <FilledButton
                    text="Perfect"
                    color="blue"
                    grow
                    onPress={()=>updateProgress(2)}/>
                    </View>
                    : null
                }
        </View>
    )
}