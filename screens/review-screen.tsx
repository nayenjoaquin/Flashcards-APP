import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FilledButton } from "components/buttons/filled-button";
import { FlashCard } from "components/layout/FlashCard";
import { useEffect, useId, useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import { cardsForReview, updateCard } from "shared/utils/spaced-repetition";
import { progressStore } from "shared/stores/progress";
import { saveLocal } from "shared/utils/common";
import { NEW_CARDS_PER_SESSION } from "shared/const/values";
import { DeckProgress, Progress, Session } from "types";

type routeProp = RouteProp<RootStackParamList, 'Review'>;
type navigationProp = NavigationProp<RootStackParamList, 'Review'>;

export const ReviewScreen = () => {

    const route  = useRoute<routeProp>();
    const navigation = useNavigation<navigationProp>();
    const [index, setIndex] = useState(0);
    const {cards, deck, progress} = route.params;
    const [results, setResults] = useState({
        wrong: 0,
        good: 0,
        perfect: 0
    })

    const {setProgress} = progressStore();

    const [session, setSession] = useState<Progress>(progress.progress)
    const [flipped, setFlipped] = useState(false);

    const finishSession = async(session: Progress) => {
        const newProgress: DeckProgress = {
            progress: session,
            lastReviewed: new Date()
        }
        console.log('FINAL SESSION PROGRESS: ', session);
        
        await saveLocal(deck.id, newProgress);
        await saveLocal('LAST_SESSION', {
            deckId: deck.id,
            wrong: results.wrong,
            good: results.good,
            perfect: results.perfect,
            reviewedOn: Date.now()
        } as Session);
        setProgress(newProgress);
        navigation.goBack();
    }

    const nextCard = async() =>{
        setIndex(prev=>prev+1)
        setFlipped(false);
    }

    const updateProgress = (q:number)=>{
        const update =updateCard({
            ...session[cards[index].id],
            q: q
        })
        console.log(cards[index].id+': ', update);
        setResults(prev=>{
            if(q==0){
                return {...prev, wrong: prev.wrong+1}
            }else if(q==1){
                return {...prev, good: prev.good+1}
            }else{
                return {...prev, perfect: prev.perfect+1}
            }
        });
        setSession(prev=>{
            prev[cards[index].id]=update;
            if(index+1==cards.length){
                finishSession(prev);
            }else{
                nextCard();
            }
            return {...prev};
        })

    }


    useLayoutEffect(() => {
        navigation.setOptions({ title: deck.name,
            headerBackTitle: ''
        });
      }, [navigation, deck.name]);

    return(
        <View className="w-full h-full p-5 items-center flex gap-5">
                <Text className="text-xl">{index + 1} / {cards.length}</Text>
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