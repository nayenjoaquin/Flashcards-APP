import { Text, TouchableOpacity, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import appTheme from "shared/const/app-theme";
import { RootStackParamList } from "types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Card } from "types";
import useCards from "shared/hooks/flashcards";


interface Props {
  card: Card;
  onClose: () => void;
  onDelete: ()=>void;
}

type navigationProp = StackNavigationProp<RootStackParamList, "Deck">;

export const CardOptionsModal = ({ onClose, onDelete, card }: Props) => {

  const navigation = useNavigation<navigationProp>();
  return (
    <View
      className="bg-white w-full pb-10 absolute bottom-0 left-0 right-0 rounded-t-2xl"
      style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    elevation: 5,
                }}
    >
      <View className="p-5 w-full border-b border-gray-200 flex flex-row justify-center items-center">
        <Text className="text-xl">Card options</Text>
        <TouchableOpacity onPress={onClose} className="absolute right-5">
          <Ionicons name="close" size={appTheme.size.m} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col w-full">
        <Pressable className="w-full flex flex-row gap-5 px-5 py-2.5 items-center"
        onPress={onDelete}>
          <Ionicons name="trash-outline" color={'red'} size={appTheme.size.m}/>
          <Text className="text-md font-semibold text-red-500">Delete card</Text>
        </Pressable>
        <Pressable onPress={()=>{
          onClose();
          navigation.push('EditCard', {
            card: card
          })
        }} className="flex flex-row gap-5 px-5 py-2.5 items-center">
          <Ionicons name="create-outline" color={'black'} size={appTheme.size.m}/>
          <Text className="text-md font-semibold text-black">Edit card</Text>
        </Pressable>
      </View>
    </View>
  );
};
