import {
  PixelRatio,
  Pressable,
  type PressableProps,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

// Components
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Text';

// Hooks
import { useThemeColor } from '@/shared/hooks/useThemeColor';

// Type
import { Colors } from '@/constants/Colors';

interface Props extends PressableProps {
  variant: 'primary' | 'secondary' | 'text' | 'border';
  title: string;
  isLoading?: boolean;
  isSubmitting?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

type ColorsKey = keyof typeof Colors.light & keyof typeof Colors.dark;

type ButtonVariantValue = {
  primary: ColorsKey;
  secondary: ColorsKey;
  text: ColorsKey;
  border: ColorsKey;
};

type ButtonVariantType = {
  background: ButtonVariantValue;
  text: ButtonVariantValue;
};

const ButtonVariant: ButtonVariantType = {
  background: {
    primary: 'buttonPrimary',
    secondary: 'buttonSecondary',
    text: 'background',
    border: 'background',
  },
  text: {
    primary: 'buttonPrimaryText',
    secondary: 'buttonSecondaryText',
    text: 'buttonSecondaryText',
    border: 'buttonSecondaryText',
  },
};

export function Button({
  title,
  variant,
  isLoading,
  isSubmitting,
  disabled,
  style,
  titleStyle,
  ...other
}: Props) {
  const buttonColor = useThemeColor({}, ButtonVariant.background[variant]);
  const textColor = useThemeColor({}, ButtonVariant.text[variant]);

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: buttonColor },
        variant === 'border' ? styles.border : null,
        disabled ? styles.disabledButton : null,
        style,
      ]}
      {...other}
      disabled={disabled || isLoading || isSubmitting}
    >
      <Text
        font="plusJakartaBold"
        style={[
          styles.title,
          { color: textColor },
          disabled ? styles.disabledButtonText : null,
          titleStyle,
        ]}
      >
        {title}
      </Text>
      {isSubmitting && <ActivityIndicator color={textColor} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    padding: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 16 / PixelRatio.getFontScale(),
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.light.buttonSecondaryText,
  },
  disabledButton: {
    backgroundColor: Colors.light.buttonDisabled,
  },
  disabledButtonText: {
    color: Colors.light.buttonDisabledText,
  },
});
