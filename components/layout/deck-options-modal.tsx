import { useEffect } from "react";
import { Text, TouchableOpacity, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import appTheme from "shared/const/app-theme";

interface Props {
  onClose: () => void;
  onDelete: ()=>void;
  onEdit: ()=>void;
}

export const DeckOptionsModal = ({ onClose, onDelete, onEdit }: Props) => {

  useEffect(() => {
  }, []);

  const closeModal = () => {
    onClose();
  };

  return (
    <View
    style={{
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    }} className="bg-white w-full pb-10 absolute bottom-0 left-0 right-0 rounded-t-2xl">
      <View className="p-5 w-full border-b border-gray-200 flex flex-row justify-center items-center">
        <Text className="text-xl">Deck options</Text>
        <TouchableOpacity onPress={closeModal} className="absolute right-5">
          <Ionicons name="close" size={appTheme.size.m} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col w-full">
        <Pressable className="w-full flex flex-row gap-5 px-5 py-2.5 items-center"
        onPress={onDelete}>
          <Ionicons name="trash-outline" color={'red'} size={appTheme.size.m}/>
          <Text className="text-md font-semibold text-red-500">Delete deck</Text>
        </Pressable>
        <Pressable className="flex flex-row gap-5 px-5 py-2.5 items-center"
        onPress={onEdit}>
          <Ionicons name="create-outline" color={'black'} size={appTheme.size.m}/>
          <Text className="text-md font-semibold text-black">Edit deck</Text>
        </Pressable>
      </View>
    </View>
  );
};
