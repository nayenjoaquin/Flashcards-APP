import { useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, TouchableOpacity, View, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FilledButton } from "../buttons/filled-button";
import { LabeledCheckBox } from "components/inputs/labeled-checkbox";
import { NewDeck } from "types";
import appTheme from "shared/const/app-theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface Props {
  onClose: () => void;
  onDelete: ()=>void;
}

export const CardOptionsModal = ({ onClose, onDelete }: Props) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current; // Start off-screen
  const [newDeck, setNewDeck] = useState<NewDeck>({
    name: '',
    description:'This is a new custom deck',
    visibility: 'private',

  });

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to visible
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT, // Slide out
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose(); // Call after animation completes
    });
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
      }}
      className="bg-white w-full pb-5 absolute bottom-0 left-0 right-0 rounded-t-2xl"
    >
      <View className="p-5 w-full border-b border-gray-200 flex flex-row justify-center items-center">
        <Text className="text-xl">Options</Text>
        <TouchableOpacity onPress={closeModal} className="absolute right-5">
          <Ionicons name="close" size={appTheme.size.m} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col w-full">
        <Pressable className="w-full flex flex-row gap-5 px-5 py-2.5 items-center"
        onPress={onDelete}>
          <Ionicons name="trash-outline" color={'red'} size={appTheme.size.m}/>
          <Text className="text-md font-semibold text-red-500">Delete card</Text>
        </Pressable>
        <Pressable className="flex flex-row gap-5 px-5 py-2.5 items-center">
          <Ionicons name="create-outline" color={'black'} size={appTheme.size.m}/>
          <Text className="text-md font-semibold text-black">Edit card</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};
