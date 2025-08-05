import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, Text, View } from "react-native";
import { DecksStackParamList, RootStackParamList } from "types/navigation";
import newGradient from 'random-gradient';
import { LinearGradient } from "expo-linear-gradient";
import { gradient2Colors } from "shared/utils/common";
import { Deck } from "types";
import { Ionicons } from "@expo/vector-icons";
import appTheme from "shared/const/app-theme";

interface DeckProps{
    deck: Deck;
    index: number;
    onPressed: ()=>void;
}


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Deck'>;

export const DeckCard = ({deck, index, onPressed}: DeckProps) => {

    const navigation = useNavigation<NavigationProp>();
    const gradient = gradient2Colors(newGradient(deck.id)) as [string, string, ...string[]];
    return(
        <View className={`w-1/2 ${index%2==0 ?'pr-2.5' : 'pl-2.5'} ${index>1 ? 'pt-5' :''}`}>
            <Pressable onPress={onPressed}>
                <View style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 2,
                    elevation: 5,
                }} className="flex w-full flex-col gap-2.5 p-2.5 bg-white rounded-lg">
                    <View className="aspect-[3/4] w-full ">
                        {deck.img ?
                            <Image className=" w-[full h-full object-cover" src={deck.img}/>
                            :
                            <LinearGradient
                                colors={gradient}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    opacity: .8
                                    
                                }}
                            ></LinearGradient>
                        }
                    </View>
                    <View className="w-full flex flex-row justify-between items-center gap-2.5">
                        <Text className="w-[80%] text-clip line-clamp-1">{deck.name}</Text>
                        { deck.featured ?<Ionicons className="" name="checkmark-circle" color={'blue'} size={appTheme.size.s}/> : null}
                    </View>
                </View>
            </Pressable>
        </View>
    )
}