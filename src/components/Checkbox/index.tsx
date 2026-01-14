import { StyleSheet, type ViewStyle } from 'react-native';

// Checkbox
import ExpoCheckbox from 'expo-checkbox';

// Colors
import { Colors } from '@/constants/Colors';

type Props = {
  value: boolean;
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
};

export function Checkbox({ value, disabled, onValueChange, style }: Props) {
  return (
    <ExpoCheckbox
      value={value}
      disabled={disabled}
      onValueChange={onValueChange}
      style={[styles.checkbox, style]}
      color={value ? Colors.light.checkbox : undefined}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 4,
    backgroundColor: Colors.light.background,
  },
});
