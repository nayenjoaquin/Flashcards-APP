import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import AppTheme from '../../shared/const/app-theme';

interface props {
    card: Card;
    selected?: boolean
    selecting?: boolean
    onTap: ()=>void
}

export const CardsListItem = ({card, selected=false, selecting = false, onTap}: props) => {
    return(
        <View key={card.id} className={`p-5 w-full flex flex-row gap-5 justify-between items-center border bg-white rounded-lg ${selected ? 'border-primary-500 border-2' : 'border-gray-300'}`}>
            <View>
                <Text className="text-md font-semibold">{card.front}</Text>
                <Text className="text-gray-600">{card.back}</Text>
            </View>
            <TouchableOpacity onPress={onTap}>
                {!selecting ?
                    <Ionicons name="ellipsis-vertical" size={24}/>
                : selected ?
                    <Ionicons name="checkmark-circle-outline" size={32} color={AppTheme.primary['500']}/>
                :
                    <Ionicons name="checkmark-circle-outline" size={32}/>
                }
            </TouchableOpacity>
        </View>
    )
}