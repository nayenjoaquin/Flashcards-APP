import { Button, Pressable, Text } from "react-native";

interface props {
    text: string;
    onPress: () => void;
}

export const FilledButton = ({ text, onPress }: props) => {
    return (
        <Pressable onPress={onPress} className="bg-primary-500 rounded-lg p-2.5 px-10 active:bg-primary-600">
            <Text className="text-white text-xl font-bold">{text}</Text>
        </Pressable>
    );
}