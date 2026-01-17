import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center">
      <Pressable onPress={() => router.push('/notifications')}>
        <Text className="text-xl font-medium text-blue-700">visit notification screens</Text>
      </Pressable>
    </View>
  );
}
