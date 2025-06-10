import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';
import { FilledButton } from './filled-button';
import { RootStackParamList } from 'types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type navigationProps = NativeStackNavigationProp<RootStackParamList, 'Main'>

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = () => {

  const navigation = useNavigation<navigationProps>();
  return (
    <View className={styles.container}>
      <Text className={styles.title}>Home Screen</Text>
      <View className={styles.separator} />
      <EditScreenInfo path={'App.tsx'} />
      <FilledButton
      text='Go to login'
      onPress={()=>{
        navigation.push('Login');
      }}/>
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
