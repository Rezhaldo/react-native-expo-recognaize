import { useNavigation as useExpoNavigation } from 'expo-router';

// Type
import type { NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
    'matching-symbol': undefined;
};

export function useNavigation() {
  const navigation = useExpoNavigation<NavigationProp<RootStackParamList>>();

  return navigation;
}
