import { Image, View } from "react-native";

interface props {
    user: User;
    size: string;
}

export const UserAvatar = ({user, size}: props) => {
    return(
        <View className={`flex aspect-square h-24 rounded-full overflow-hidden`}>
            <Image className="h-full object-contain"
            source={{ uri: `https://api.dicebear.com/8.x/thumbs/png?seed=${user?.id}` }}
            />
        </View>
    )
}