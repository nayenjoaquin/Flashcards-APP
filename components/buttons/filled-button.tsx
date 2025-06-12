import { Button, Pressable, Text, TouchableOpacity } from "react-native";

interface props {
    text: string;
    onPress: () => void;
    color?: string;
    grow?: boolean;
}

export const FilledButton = ({ text, onPress, color, grow=false}: props) => {
    return (
        <TouchableOpacity
        style={{
            backgroundColor: color ?? '#ff9500',
            flexGrow: grow ? 1 : 0,
            width: grow ? null : '100%'

        }}
         onPress={onPress} className='flex flex-row justify-center rounded-xl p-5 px-10'>
            <Text className="text-white font-bold">{text}</Text>
        </TouchableOpacity>
    );
}