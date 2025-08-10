import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FilledButton } from "components/buttons/filled-button";
import { FlashCard } from "components/layout/FlashCard";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { RootStackParamList } from "types/navigation";
import { updateCard } from "shared/utils/spaced-repetition";
import { newSession, Progress, ProgressMap, Session } from "types";
import { useProgress } from "shared/hooks/progress";
import { useSession } from "shared/hooks/last-session";
import { ReviewCompletedScreen } from "./review-completed-screen";

type routeProp = RouteProp<RootStackParamList, 'Review'>;
type navigationProp = NavigationProp<RootStackParamList, 'Review'>;

type Results = {wrong: number,good: number,perfect: number}

export const ReviewScreen = () => {

    const route  = useRoute<routeProp>();
    const navigation = useNavigation<navigationProp>();
    const [index, setIndex] = useState(0);
    const {saveProgress} = useProgress();
    const [completed, setCompleted] = useState(false);
    const {cards, deck, onReviewFinished} = route.params;
    const {saveSession} = useSession();
    const [start, setStart] = useState(0);
    
    
    const [session, setSession] = useState<newSession>({
        deck_id: deck.id,
        wrong: 0,
        good: 0,
        perfect: 0,
        duration: 0
    })

    const [sessionProgress, setSessionProgress] = useState<ProgressMap>(deck.progress??{})
    const [flipped, setFlipped] = useState(false);

    const finishSession = async(progress: ProgressMap) => {
        const end = Date.now();
        setSession(prev=>({
            ...prev,
            duration: end-start
        }))
        const updatedDeck = await saveProgress(deck, progress);
        if(!updatedDeck) return;
        onReviewFinished(updatedDeck);
        
        await saveSession(session)
        setCompleted(true);
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
        let updatedSession;
        if(q==0){
            updatedSession = {...session, wrong: session.wrong+1}
        }else if(q==1){
            updatedSession = {...session, good: session.good+1}
        }else{
            updatedSession = {...session, perfect: session.perfect+1}
        }
        setSession(updatedSession);

        if(index==cards.length-1){
            finishSession(sessionProgress);
        }else nextCard();

    }

    useEffect(()=>{
        setStart(Date.now());
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({ title: deck.name,
            headerBackTitle: ''
        });
      }, [navigation, deck.name]);
    if(completed) return <ReviewCompletedScreen session={session}/>

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