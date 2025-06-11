import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';
import { FilledButton } from './filled-button';
import { RootStackParamList } from 'types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStore } from 'shared/stores/auth';

type navigationProps = NativeStackNavigationProp<RootStackParamList, 'Main'>

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = () => {

  const navigation = useNavigation<navigationProps>();
  const auth = AuthStore();


  return (
    <View className={styles.container}>
      <Text className=" text-3xl font-semibold">Welcome back {auth.user?.username}!</Text>
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
