import {
  type ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';

// Colors
import { Colors } from '@/constants/Colors';

interface Props extends ActivityIndicatorProps {}

export function ActivityIndicator(props: Props) {
  return <RNActivityIndicator color={Colors.light.buttonPrimary} {...props} />;
}
