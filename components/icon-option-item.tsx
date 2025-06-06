import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface props{
    icon: IoniconName;
    text: string;
    color: string;
}

export const IconOptionItem = ({icon, text, color}: props) => {
    return(
        <View className={` flex flex-row justify-start gap-5`}>
            <Ionicons name={icon} size={24} color={color}/>
            <Text
            style={{
                color: color
            }}
            className={`text-${color}-500 text-xl`}>{text}</Text>
        </View>
    )
}