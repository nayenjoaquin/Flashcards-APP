import { Text, TextInput, View } from "react-native";

interface props {
    onChange: (text: string)=>void;
    value: string;
    placeholder: string;
    label: string
}

export const LabeledTextField = ({onChange, placeholder, value, label}: props) => {
    return(
        <View className="w-full flex gap-2.5">
            <Text className="text-sm text-gray-500">{label}</Text>
            <TextInput
                onChangeText={onChange}
                className="bg-white p-5 rounded-xl text-xl w-full placeholder:text-gray-300"
                placeholder={placeholder}
                value={value}
            />
        </View>
    )
}