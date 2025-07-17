import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FilledButton } from "components/buttons/filled-button";
import { FlashCard } from "components/layout/FlashCard";
import { useEffect, useId, useLayoutEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import { updateCard } from "shared/utils/spaced-repetition";
import { saveLocal } from "shared/utils/common";
import { NEW_CARDS_PER_SESSION } from "shared/const/values";
import { Progress, ProgressMap, Session } from "types";
import { useProgress } from "shared/hooks/progress";
import { useAuth } from "shared/hooks/auth";
import { useSession } from "shared/hooks/last-session";
import useDecks from "shared/hooks/decks";

type routeProp = RouteProp<RootStackParamList, 'Review'>;
type navigationProp = NavigationProp<RootStackParamList, 'Review'>;

type Results = {wrong: number,good: number,perfect: number}

export const ReviewScreen = () => {

    const route  = useRoute<routeProp>();
    const navigation = useNavigation<navigationProp>();
    const [index, setIndex] = useState(0);
    const {saveProgress} = useProgress();
    const {cards, deck, onReviewFinished} = route.params;
    const {user} = useAuth();
    const {saveSession} = useSession();
    const {updateDecks} = useDecks();
    const start = Date.now()
    
    const [results, setResults] = useState({
        wrong: 0,
        good: 0,
        perfect: 0
    })

    const [sessionProgress, setSessionProgress] = useState<ProgressMap>(deck.progress??{})
    const [flipped, setFlipped] = useState(false);

    const finishSession = async(progress: ProgressMap, results: Results) => {
        const session = {
            deck_id: deck.id,
            wrong: results.wrong,
            good: results.good,
            perfect: results.perfect,
            created_at: Date.now(),
            duration: Date.now() - start
        } as Session
        const updated = await saveProgress(deck, progress)
        if(!updated) return;
        updateDecks(updated);
        onReviewFinished(updated);
        await saveSession(session, user?.token)
        navigation.goBack();
    }

    const nextCard = async() =>{
        setIndex(prev=>prev+1)
        setFlipped(false);
    }

    const review = (q:number)=>{
        const cardUpdate =updateCard({
            ...sessionProgress[cards[index].id],
            q: q
        });
        setSessionProgress(prev=>{
            prev[cards[index].id]=cardUpdate;
            return prev;
        })
        let newResults;
        if(q==0){
            newResults = {...results, wrong: results.wrong+1}
        }else if(q==1){
            newResults = {...results, good: results.good+1}
        }else{
            newResults = {...results, perfect: results.perfect+1}
        }
        setResults(newResults);

        if(index==cards.length-1){
            finishSession(sessionProgress, newResults);
        }else nextCard();

    }


    useLayoutEffect(() => {
        navigation.setOptions({ title: deck.name,
            headerBackTitle: ''
        });
      }, [navigation, deck.name]);

    return(
        <View className="w-full h-full max-h-screen p-10">
            <SafeAreaView className="flex items-center gap-5">
                <Text className="text-xl">{index + 1} / {cards.length}</Text>
                <FlashCard card={cards[index]} flipped={flipped} onFlip={()=>setFlipped(true)} onNext={nextCard} key={cards[index]?.id}/>
                {
                    flipped?
                    <View className="flex flex-row gap-2.5 w-full justify-center">
                    <FilledButton
                    text="Wrong"
                    color="red"
                    grow
                    onPress={()=>review(0)}/>
                    <FilledButton
                    text="Good"
                    color="green"
                    grow
                    onPress={()=>review(1)}/>
                    <FilledButton
                    text="Perfect"
                    color="blue"
                    grow
                    onPress={()=>review(2)}/>
                    </View>
                    : null
                }
            </SafeAreaView>
        </View>
    )
}