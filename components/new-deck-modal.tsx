import { useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FilledButton } from "./filled-button";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface Props {
  onClose: () => void;
  onSubmit:(deck: NewDeck)=> void;
}

export const NewDeckModal = ({ onClose, onSubmit }: Props) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current; // Start off-screen
  const [newDeck, setNewDeck] = useState<NewDeck>({
    name: '',
    description:'This is a new custom deck',
    visibility: 'private',

  });

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to visible
      duration: 300,
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
      className="bg-white pb-5 absolute bottom-0 left-0 right-0 rounded-t-3xl"
    >
      <View className="p-5 w-full border-b border-gray-200 flex flex-row justify-center items-center">
        <Text className="text-xl">New Deck</Text>
        <TouchableOpacity onPress={closeModal} className="absolute right-5">
          <Ionicons name="close" size={32} />
        </TouchableOpacity>
      </View>

      <View className="w-full p-5 flex gap-5">
        <Text className="text-md text-gray-500">
          Create your own deck and personalize the way you learn.
        </Text>
        <TextInput
        onChangeText={(text)=>{
          setNewDeck(prev=>({
            ...prev,
            name: text
          }));
        }}
          placeholder="Deck name"
          className="w-full text-xl bg-secondary-100 rounded-md p-2.5"
        />
        <FilledButton text="Create new deck" onPress={async () => {
          await onSubmit(newDeck);
          onClose();
        }} />
      </View>
    </Animated.View>
  );
};
