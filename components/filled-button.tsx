import { Button, Pressable, Text, TouchableOpacity } from "react-native";

interface props {
    text: string;
    onPress: () => void;
    color?: string
}

export const FilledButton = ({ text, onPress, color }: props) => {
    return (
        <TouchableOpacity
        style={{
            backgroundColor: color ?? '#ff9500'
        }}
         onPress={onPress} className='flex flex-row justify-center rounded-xl p-5 px-10'>
            <Text className="text-white font-bold">{text}</Text>
        </TouchableOpacity>
    );
}