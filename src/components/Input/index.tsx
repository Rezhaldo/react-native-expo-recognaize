import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, type TextInputProps } from 'react-native';

// Reanimated
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

// Colors
import { Colors } from '@/constants/Colors';

// Shared
import { TextStyle } from '@/shared';

// Icons
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props extends TextInputProps {
  isError?: boolean;
  isPassword?: boolean;
}

export function Input({ isError, isPassword, value, ...other }: Props) {
  // #region state
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(other.secureTextEntry ?? false);
  // #endregion

  // #region hooks
  const textStyle = TextStyle();
  // #endregion

  return (
    <>
      <TextInput
        {...other}
        value={value}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          textStyle.input,
          {
            backgroundColor: Colors.light.background,
            borderColor: isError ? Colors.light.inputError : Colors.light.inputBorder,
            paddingRight: isPassword ? 40 : 0,
          },
        ]}
        placeholderTextColor={Colors.light.inputBorder}
      />
      {isPassword && !!value && (
        <Pressable style={styles.icons} onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {secureTextEntry ? (
              <Ionicons name="eye" size={24} color="black" />
            ) : (
              <Ionicons name="eye-off" size={24} color="black" />
            )}
          </Animated.View>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontFamily: 'PlusJakartaSans',
  },
  icons: {
    backgroundColor: Colors.light.background,
    position: 'absolute',
    right: 10,
    top: 18,
  },
});
